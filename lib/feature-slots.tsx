import type { ReactNode } from "react";

/**
 * Custom components for feature-card media — this file is yours to edit
 * (upgrades seed it if missing and never overwrite it).
 *
 * A feature card's media area (the top of the card) normally holds an image or
 * video, but it can hold any React node: a diagram, an animated illustration, a
 * live widget. Register it here under a slot name, then reference it from
 * `lib/site-config.ts`:
 *
 *   features: [
 *     { title: "…", body: "…", slot: "diagram" },
 *   ]
 *
 * The node fills the card's media band (full width, ~11rem tall by default), so
 * size and clip it to taste. If a slot needs hooks, state, or browser APIs, put
 * that component in its own file with a `"use client"` directive and import it
 * here — it hydrates normally even though the site is a static export.
 */
export const featureSlots: Record<string, ReactNode> = {
  // diagram: <YourDiagram />,
};
