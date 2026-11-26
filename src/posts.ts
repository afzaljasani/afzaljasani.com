import snapshot from './data/posts.json';

export type Post = { title: string; subtitle: string; url: string; date: string };

const FEED = 'https://afzaljasani.substack.com/feed';

const field = (item: string, tag: string) => {
  const m = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : '';
};

// Posts come from the Substack feed at build time; the committed snapshot is the fallback.
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(FEED, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`feed returned ${res.status}`);
    const xml = await res.text();
    const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
      title: field(item, 'title'),
      subtitle: field(item, 'description'),
      url: field(item, 'link'),
      date: new Date(field(item, 'pubDate')).toISOString().slice(0, 10)
    }));
    if (posts.length === 0) throw new Error('feed had no items');
    return posts;
  } catch (err) {
    console.warn(`Substack feed unavailable, using snapshot: ${err}`);
    return snapshot;
  }
}
