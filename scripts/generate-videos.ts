/**
 * generate-videos.ts
 * Calls the platform's /api/asset/video endpoint with keyframe URLs
 * (async via operationId polling). Writes URLs to content/asset-manifest.json
 * {videos: {slot: url}} and downloads each clip to raw/{slot}.mp4 for ffmpeg.
 */

import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const API_URL = process.env.KODAGEN_ASSET_API_URL!;
const TOKEN = process.env.KODAGEN_BUILD_TOKEN!;
const PROJECT_ID = process.env.KODAGEN_PROJECT_ID!;
const POLL_MS = parseInt(process.env.VEO_POLL_MS ?? "10000", 10);
const MAX_POLL_MIN = parseInt(process.env.VEO_MAX_POLL_MIN ?? "10", 10);
const MANIFEST = "content/asset-manifest.json";

if (!API_URL || !TOKEN || !PROJECT_ID) {
  console.error("✗ Missing KODAGEN_* env vars");
  process.exit(1);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Manifest = {
  bucket: string;
  projectId: string;
  ref: string;
  images: Record<string, string>;
  videos: Record<string, string>;
  frames: Record<string, string[]>;
  updatedAt: string;
};

async function readManifest(): Promise<Manifest> {
  return JSON.parse(await readFile(MANIFEST, "utf8")) as Manifest;
}

async function writeManifest(m: Manifest): Promise<void> {
  m.updatedAt = new Date().toISOString();
  await writeFile(MANIFEST, JSON.stringify(m, null, 2));
}

async function startVideo(opts: {
  prompt: string;
  slot: string;
  startFrameUrl?: string;
  endFrameUrl?: string;
}): Promise<string> {
  const res = await fetch(`${API_URL}/api/asset/video`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ ...opts, projectId: PROJECT_ID }),
  });
  if (!res.ok) throw new Error(`start HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { operationId: string };
  if (!data.operationId) throw new Error("no operationId");
  return data.operationId;
}

async function pollVideo(operationId: string, slot: string): Promise<string> {
  const deadline = Date.now() + MAX_POLL_MIN * 60_000;
  let tick = 0;
  while (Date.now() < deadline) {
    await sleep(POLL_MS);
    const url = new URL(`${API_URL}/api/asset/video`);
    url.searchParams.set("operation", operationId);
    url.searchParams.set("slot", slot);
    url.searchParams.set("projectId", PROJECT_ID);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!res.ok) {
      console.warn(`  poll HTTP ${res.status}, retrying`);
      continue;
    }
    const data = (await res.json()) as { done: boolean; url?: string; error?: string };
    tick++;
    process.stdout.write(`.`);
    if (tick % 12 === 0) process.stdout.write(` (${(tick * POLL_MS) / 1000}s)`);
    if (data.error) throw new Error(`Veo error: ${data.error}`);
    if (data.done) {
      process.stdout.write("\n");
      if (!data.url) throw new Error("done but no url");
      return data.url;
    }
  }
  throw new Error(`timeout after ${MAX_POLL_MIN} min`);
}

async function main() {
  console.log("\n🎬 Video Generation (platform shim → Vertex/Veo)\n");
  const manifest = await readManifest();
  const promptsDir = "prompts";

  let sceneDirs: string[];
  try {
    sceneDirs = (await readdir(promptsDir)).filter((d) => d.startsWith("scene-")).sort();
  } catch {
    console.error("✗ prompts/ not found");
    process.exit(1);
  }

  if (sceneDirs.length === 0) {
    console.log("No scenes to generate.");
    return;
  }

  await mkdir("raw", { recursive: true });

  for (const scene of sceneDirs) {
    const slot = scene;
    if (manifest.videos[slot] && existsSync(`raw/${slot}.mp4`)) {
      console.log(`⏭  ${scene} already in manifest + raw/`);
      continue;
    }

    let url = manifest.videos[slot];
    if (!url) {
      const motionPath = join(promptsDir, scene, "motion.txt");
      if (!existsSync(motionPath)) {
        console.error(`✗ ${scene} — missing motion.txt`);
        continue;
      }
      const startUrl = manifest.images[`${scene}-start`];
      const endUrl = manifest.images[`${scene}-end`];
      if (!startUrl || !endUrl) {
        console.error(`✗ ${scene} — missing keyframes`);
        continue;
      }
      const prompt = (await readFile(motionPath, "utf-8")).trim();
      console.log(`→ ${scene}: starting`);
      const operationId = await startVideo({ prompt, slot, startFrameUrl: startUrl, endFrameUrl: endUrl });
      process.stdout.write(`  polling`);
      url = await pollVideo(operationId, slot);
      manifest.videos[slot] = url;
      await writeManifest(manifest);
      console.log(`✓ ${scene} URL: ${url.slice(0, 80)}...`);
    }

    if (!existsSync(`raw/${slot}.mp4`)) {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`download ${url}: HTTP ${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer());
      await writeFile(`raw/${slot}.mp4`, buf);
      console.log(`  ↓ raw/${slot}.mp4 (${(buf.length / 1024).toFixed(0)} KB)`);
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
