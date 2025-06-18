import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const docsDirectory = path.join(process.cwd(), 'next-site', 'docs');

export function getDocSlugs() {
  return fs.readdirSync(docsDirectory).filter((f) => f.endsWith('.md'));
}

export function getDocBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(docsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const title = data.title || content.match(/^#\s+(.*)/m)?.[1] || realSlug;
  const excerpt = data.excerpt || content.slice(0, 200);
  return { slug: realSlug, title, content, excerpt };
}

export function getAllDocs() {
  const slugs = getDocSlugs();
  return slugs.map((slug) => getDocBySlug(slug)).sort((a, b) => a.title.localeCompare(b.title));
} 