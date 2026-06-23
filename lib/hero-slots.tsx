import type { ReactNode } from "react";

/**
 * Custom hero showcase components — this file is yours to edit (upgrades never
 * overwrite it).
 *
 * The hero showcase normally holds an image or video, but it can hold any React
 * node: a live demo, an animated diagram, an embed, a stats panel. Define each
 * one here under a slot name, then point to it from `lib/site-config.ts`:
 *
 *   hero: {
 *     …,
 *     media: { type: "custom", slot: "demo", placement: "overlap" },
 *   }
 *
 * You can also mix custom slots with images/videos in a carousel array:
 *
 *   media: [
 *     { type: "image",  src: "/hero.png" },
 *     { type: "custom", slot: "demo" },
 *   ]
 *
 * Custom nodes render inside the same frame as images/videos, so they inherit
 * the "below" card chrome or the "overlap" feathering automatically. If a slot
 * needs hooks, state, or browser APIs, put that component in its own file with
 * a "use client" directive and import it here.
 */
export const heroSlots: Record<string, ReactNode> = {
  // demo: <YourComponent />,
};
