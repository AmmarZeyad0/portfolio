import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts: one Markdown file per post in src/content/blog/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Projects: one Markdown file per project in src/content/projects/
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    period: z.string(),
    status: z.enum(['in-progress', 'completed']),
    order: z.number().default(99),
    stack: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

// PDF library: entries listed in src/content/library.json, files live in public/pdfs/
const library = defineCollection({
  loader: file('./src/content/library.json'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    file: z.string(), // e.g. "/pdfs/my-notes.pdf" or a full URL (Cloudflare R2)
    cover: z.string().optional(), // preview image, e.g. "/pdfs/thumbs/my-notes.jpg"
    post: z.string().optional(), // link to the matching blog post, if any
    pages: z.number().optional(),
    kind: z.enum(['notes', 'certificate', 'paper', 'cheatsheet', 'cv', 'other']),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, projects, library };
