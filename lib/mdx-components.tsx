import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

/**
 * Components available in every `.mdx` doc and blog post — this file is yours to
 * edit (upgrades seed it if missing and never overwrite it).
 *
 * Anything you register here can be used as a tag in `.mdx` content with no
 * import, e.g. `<Callout type="tip">…</Callout>`. Markdown still works inside a
 * component's children, and JSX expressions work too (`<Chart data={[1,2,3]} />`).
 *
 * For an interactive component (state, effects, browser APIs), put it in its own
 * file with a `"use client"` directive and import it here — it hydrates normally
 * even though the site is a static export. Example:
 *
 *   // components/counter.tsx  → "use client" + useState
 *   import { Counter } from "@/components/counter";
 *   export const mdxComponents = { Callout, Counter };
 *
 * You can also override default elements (e.g. `h1`, `a`, `pre`) by adding them
 * here under their HTML tag name.
 */

type CalloutProps = {
  type?: "note" | "tip" | "warning";
  children?: ReactNode;
};

const CALLOUT_STYLES: Record<string, string> = {
  note: "border-line bg-paper-deep text-ink-soft",
  tip: "border-accent/30 bg-accent-soft/40 text-ink",
  warning: "border-amber-300 bg-amber-50 text-amber-900",
};

/** A simple admonition box. Markdown renders inside `children`. */
function Callout({ type = "note", children }: CalloutProps) {
  return (
    <div
      className={`my-6 rounded-xl border px-5 py-1 ${CALLOUT_STYLES[type] ?? CALLOUT_STYLES.note}`}
    >
      {children}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Callout,
};
