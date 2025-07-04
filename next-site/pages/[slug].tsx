import { getDocBySlug, getAllDocs } from '@lib/docs';
import Layout from '@components/Layout';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

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
        className="prose prose-slate dark:prose-invert lg:prose-xl mx-auto px-6 py-16"
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
  const processed = await remark()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(doc.content);
  return {
    props: {
      title: doc.title,
      htmlContent: processed.toString(),
    },
  };
}; 