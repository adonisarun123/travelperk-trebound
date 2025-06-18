import Link from 'next/link';

interface Props {
  slug: string;
  title: string;
  excerpt: string;
}

export default function Card({ slug, title, excerpt }: Props) {
  return (
    <Link href={`/${slug}`} className="group block bg-card rounded-3xl shadow-lg hover:shadow-2xl transition p-6 hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
        {title}
      </h2>
      <p className="text-sm opacity-75 leading-relaxed line-clamp-3">{excerpt}</p>
    </Link>
  );
} 