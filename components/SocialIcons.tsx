import { Github, Linkedin } from "lucide-react";

type Socials = {
  github?: string;
  linkedin?: string;
  x?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
};

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77Z" />
    </svg>
  );
}

export default function SocialIcons({ socials }: { socials: Socials }) {
  const entries: Array<{ key: keyof Socials; url: string; label: string; Icon: any }> = [];
  if (socials.github) entries.push({ key: "github", url: socials.github, label: "GitHub", Icon: Github });
  if (socials.linkedin) entries.push({ key: "linkedin", url: socials.linkedin, label: "LinkedIn", Icon: Linkedin });
  if (socials.x) entries.push({ key: "x", url: socials.x, label: "X (Twitter)", Icon: XIcon });

  return (
    <div className="flex items-center gap-3">
      {entries.map(({ key, url, label, Icon }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-ink/65 hover:text-primary hover:border-primary/40 transition-colors"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
