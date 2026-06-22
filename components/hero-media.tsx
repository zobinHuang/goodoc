import type { HeroMedia as HeroMediaConfig } from "@/lib/site-config";
import { withBasePath } from "@/lib/paths";

/**
 * Showcase image or video shown below the hero text. Rendered as a calm,
 * floating card — rounded frame, soft shadow, and a faint on-brand glow — so it
 * draws the eye without competing with the headline. Videos play as ambient
 * loops (muted, no controls).
 */
export function HeroMedia({ media }: { media: HeroMediaConfig }) {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      {/* soft glow behind the card for depth, not contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -bottom-6 top-6 -z-10 rounded-[2.5rem] bg-accent-soft/50 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-32px_rgba(43,41,37,0.30)]">
        {media.type === "video" ? (
          <video
            className="block w-full"
            src={withBasePath(media.src)}
            poster={media.poster ? withBasePath(media.poster) : undefined}
            autoPlay
            loop
            muted
            playsInline
            aria-label={media.alt}
          />
        ) : (
          // Plain <img>: the static export has no next/image optimizer.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="block w-full"
            src={withBasePath(media.src)}
            alt={media.alt ?? ""}
          />
        )}
      </div>
    </div>
  );
}
