/**
 * generate-images.ts
 * Calls the platform's /api/asset/image endpoint (server-side Vertex/Gemini)
 * which uploads to Supabase Storage and returns a public CDN URL.
 * Writes URLs to content/asset-manifest.json {images: {slot: url}}.
 *
 * Reads prompts from:
 *   - prompts/scene-N/start.txt, end.txt   (scene keyframes)
 *   - prompts/section-*.txt                 (static section images)
 *   - prompts/service-*.txt                 (per-service card images)
 *
 * Required env (provided by Kodagen runtime):
 *   KODAGEN_ASSET_API_URL
 *   KODAGEN_BUILD_TOKEN
 *   KODAGEN_PROJECT_ID
 */

import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const API_URL = process.env.KODAGEN_ASSET_API_URL!;
const TOKEN = process.env.KODAGEN_BUILD_TOKEN!;
const PROJECT_ID = process.env.KODAGEN_PROJECT_ID!;
const CONCURRENCY = parseInt(process.env.IMAGE_CONCURRENCY ?? "4", 10);
const MANIFEST = "content/asset-manifest.json";

if (!API_URL || !TOKEN || !PROJECT_ID) {
  console.error("✗ Missing KODAGEN_ASSET_API_URL / KODAGEN_BUILD_TOKEN / KODAGEN_PROJECT_ID");
  process.exit(1);
}

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
  if (!existsSync(MANIFEST)) {
    return {
      bucket: "site-assets",
      projectId: PROJECT_ID,
      ref: "",
      images: {},
      videos: {},
      frames: {},
      updatedAt: new Date().toISOString(),
    };
  }
  return JSON.parse(await readFile(MANIFEST, "utf8")) as Manifest;
}

async function writeManifest(m: Manifest): Promise<void> {
  m.updatedAt = new Date().toISOString();
  await mkdir("content", { recursive: true });
  await writeFile(MANIFEST, JSON.stringify(m, null, 2));
}

async function generateImage(prompt: string, slot: string): Promise<string> {
  const res = await fetch(`${API_URL}/api/asset/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ prompt, slot, projectId: PROJECT_ID }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HTTP ${res.status}: ${txt.slice(0, 200)}`);
  }
  const data = (await res.json()) as { url: string };
  if (!data.url) throw new Error("no url in response");
  return data.url;
}

type Job = { promptPath: string; slot: string; label: string };

async function collectJobs(): Promise<Job[]> {
  const jobs: Job[] = [];
  const promptsDir = "prompts";
  let entries: string[];
  try {
    entries = await readdir(promptsDir);
  } catch {
    return jobs;
  }

  for (const d of entries.filter((d) => d.startsWith("scene-")).sort()) {
    for (const frameType of ["start", "end"] as const) {
      const promptPath = join(promptsDir, d, `${frameType}.txt`);
      if (existsSync(promptPath)) {
        jobs.push({ promptPath, slot: `${d}-${frameType}`, label: `${d}/${frameType}` });
      }
    }
  }

  for (const f of entries.filter((f) => (f.startsWith("section-") || f.startsWith("service-")) && f.endsWith(".txt"))) {
    const base = f.replace(/\.txt$/, "");
    jobs.push({ promptPath: join(promptsDir, f), slot: base, label: base });
  }

  return jobs;
}

async function main() {
  console.log("\n🎨 Image Generation (platform shim → Vertex/Gemini)");
  console.log(`   Concurrency: ${CONCURRENCY}\n`);

  const manifest = await readManifest();
  const jobs = await collectJobs();
  if (jobs.length === 0) {
    console.log("No prompts found.");
    return;
  }

  const remaining = jobs.filter((j) => !manifest.images[j.slot]);
  const skipped = jobs.length - remaining.length;
  console.log(`Found ${jobs.length}; ${skipped} already in manifest; ${remaining.length} to generate.\n`);

  let nextIdx = 0;
  let done = 0;
  let failed = 0;

  async function worker(): Promise<void> {
    while (true) {
      const i = nextIdx++;
      if (i >= remaining.length) return;
      const job = remaining[i];
      const prompt = (await readFile(job.promptPath, "utf-8")).trim();
      try {
        const url = await generateImage(prompt, job.slot);
        manifest.images[job.slot] = url;
        await writeManifest(manifest);
        done++;
        console.log(`✓ [${done + skipped}/${jobs.length}] ${job.label}`);
      } catch (err: any) {
        failed++;
        console.error(`✗ ${job.label} — ${err.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log(`\nDone. Generated ${done}, skipped ${skipped}, failed ${failed}.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
