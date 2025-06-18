import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-background/80 border-b border-black/5 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold hover:text-accent transition-colors">
          Trebound × TravelPerk
        </Link>
      </div>
    </header>
  );
} 