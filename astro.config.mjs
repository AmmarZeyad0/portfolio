// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Obsidian-style callouts:  > [!tip] Title
 * Turns the blockquote into <blockquote class="callout callout-tip" data-label="tip">
 * so notes copied straight from Obsidian render nicely.
 */
function remarkCallouts() {
  /** @param {any} tree */
  return (tree) => {
    /** @param {any} node */
    const walk = (node) => {
      if (node.type === 'blockquote') {
        const p = node.children?.[0];
        const t = p?.type === 'paragraph' && p.children?.[0];
        if (t && t.type === 'text') {
          const m = t.value.match(/^\[!(\w+)\][+-]?[ \t]*/);
          if (m) {
            const type = m[1].toLowerCase();
            t.value = t.value.slice(m[0].length);
            // Split "Title\nbody…" into a title paragraph and a body paragraph
            const kids = p.children;
            const idx = kids.findIndex((/** @type {any} */ k) => k.type === 'text' && k.value.includes('\n'));
            if (idx !== -1) {
              const k = kids[idx];
              const cut = k.value.indexOf('\n');
              const head = [...kids.slice(0, idx), { type: 'text', value: k.value.slice(0, cut) }];
              const tail = [{ type: 'text', value: k.value.slice(cut + 1) }, ...kids.slice(idx + 1)];
              node.children.splice(0, 1,
                { type: 'paragraph', children: head, data: { hProperties: { className: ['callout-title'] } } },
                { type: 'paragraph', children: tail });
            } else if (node.children.length > 1) {
              p.data = { hProperties: { className: ['callout-title'] } };
            }
            node.data = { ...node.data, hProperties: { className: ['callout', `callout-${type}`], 'data-label': type } };
          }
        }
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkCallouts],
    shikiConfig: { theme: 'github-dark' },
  },
});
