# afzaljasani.com

Personal site, built with [Astro](https://astro.build).

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # static output in dist/
pnpm check    # type check
```

## Content

- `src/data/cooking.json`: cook log (`dish`, `date`, optional `photo` in `public/cooking/`, optional `recipe` link)
- `src/data/reading.json`: bookshelf
- `src/data/projects.json`: things made
- Writing is pulled from the Substack feed at build time; `src/data/posts.json` is the fallback.
