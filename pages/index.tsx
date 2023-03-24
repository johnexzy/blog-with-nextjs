import Head from "next/head";
import Link from "next/link";
import { fetchAllPosts } from "@/helpers";

export default function Home({ posts }: any) {
  return (
    <>
      <Head>
        <title>Leccel Blog</title>
        <meta name="description" content="A practical guide to Jamstack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h1>In the news</h1>
        <ul>
          {posts.map((post: any) => (
            <li key={post.ID}><Link href={`posts/${post.slug}`}>{post.title}</Link></li>
          ))}
        </ul>
      </main>
    </>
  );
}
export async function getStaticProps() {
  // Call the wordpress.com API endpoint to get posts
  const allPosts = await fetchAllPosts();

  // By returning { props: { posts } }, the Home component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: allPosts.posts,
    },
  };
}
