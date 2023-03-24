import { GetStaticProps } from "next";
import { fetchAllPosts, fetchSinglePost, createMarkup } from "@/helpers";

import Head from "next/head";
export async function getStaticPaths() {
  const res = (await fetchAllPosts('slug')).posts.map((post: any) => ({
    params: post,
  }));

  return {
    paths: res,
    fallback: false,
  };
}
export const getStaticProps: GetStaticProps = async (context) => {
  const post = await fetchSinglePost(context.params!.slug as string);

  return {
    props: { post },
  };
};

export default function BlogPost({ post }: { post: any }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.title}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content={post.featured_image}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
          <div className="blog-html">
            <h1 className="text-center">{post.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={createMarkup(post.content)}
            ></div>
          </div>
      </div>
    </>
  );
}