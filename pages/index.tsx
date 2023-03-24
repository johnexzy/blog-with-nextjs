import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home({ posts }: any) {
  return (
    <>
      <Head>
        <title>Leccel Blog</title>
        <meta name="description" content="A practical guide to Jamstack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
  const res = await fetch(
    "https://public-api.wordpress.com/rest/v1/sites/200671771/posts"
  );
  const allPosts = await res.json();

  // By returning { props: { posts } }, the Home component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: allPosts.posts,
    },
  };
}
