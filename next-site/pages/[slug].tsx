import { getDocBySlug, getAllDocs } from '@lib/docs';
import Layout from '@components/Layout';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { remark } from 'remark';
import html from 'remark-html';

interface Props {
  title: string;
  htmlContent: string;
}

export default function DocPage({ title, htmlContent }: Props) {
  return (
    <Layout title={title}>
      <section className="min-h-[40vh] flex items-end justify-center doc-hero">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center max-w-3xl px-6">
          {title}
        </h1>
      </section>
      <article
        className="prose lg:prose-lg mx-auto px-6 py-16"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = getAllDocs();
  return {
    paths: docs.map((d) => ({ params: { slug: d.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const doc = getDocBySlug(slug);
  const processed = await remark().use(html).process(doc.content);
  return {
    props: {
      title: doc.title,
      htmlContent: processed.toString(),
    },
  };
}; 