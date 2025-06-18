import Layout from '@components/Layout';
import Card from '@components/Card';
import { getAllDocs } from '@lib/docs';
import type { GetStaticProps } from 'next';

type Props = {
  docs: { slug: string; title: string; excerpt: string }[];
};

export default function Home({ docs }: Props) {
  return (
    <Layout>
      <header className="py-20 text-center bg-gradient-to-b from-white/60 to-transparent dark:from-black/60">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Trebound × TravelPerk Playbooks</h1>
        <p className="max-w-2xl mx-auto text-lg opacity-80">
          Explore strategic insights, execution roadmaps &amp; technical toolkits crafted for our transformation journey.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 md:px-8 -mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Card key={doc.slug} {...doc} />
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const docs = getAllDocs();
  return {
    props: {
      docs,
    },
  };
}; 