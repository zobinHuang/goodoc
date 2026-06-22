import type { HeroMedia as HeroMediaConfig } from "@/lib/site-config";
import { withBasePath } from "@/lib/paths";

/** Radial feather: keeps the right-of-centre opaque, fades every edge to
 * transparent — most of all the left edge, which approaches the text. */
const FEATHER = "radial-gradient(78% 82% at 70% 50%, #000 40%, transparent 80%)";

/**
 * Showcase image or video for the hero. Two placements:
 *
 * - "below"   — a calm floating card beneath the text (rounded, soft shadow).
 * - "overlap" — sits in the same band as the text, shifted to the side with
 *   feathered edges so it reads as an ambient backdrop, never competing with
 *   the words (which render above it).
 *
 * Videos play as muted, looping ambient clips.
 */
export function HeroMedia({ media }: { media: HeroMediaConfig }) {
  const overlap = media.placement === "overlap";

  const inner =
    media.type === "video" ? (
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
    );

  if (overlap) {
    return (
      <div className="relative min-w-0 lg:-ml-[14%] lg:w-[130%]">
        {/* soft glow for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-6 -z-10 bg-accent-soft/40 blur-3xl"
        />
        <div
          className="overflow-hidden"
          style={{ maskImage: FEATHER, WebkitMaskImage: FEATHER }}
        >
          {inner}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -bottom-6 top-6 -z-10 rounded-[2.5rem] bg-accent-soft/50 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-32px_rgba(43,41,37,0.30)]">
        {inner}
      </div>
    </div>
  );
}
