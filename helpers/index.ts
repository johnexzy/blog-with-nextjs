export async function fetchAllPosts(field: string = '') {
  const res = await fetch(
    "https://public-api.wordpress.com/rest/v1/sites/200671771/posts?fields="+field
  );
  return await res.json();
}

export async function fetchSinglePost(slug: string) {
  const res = await fetch(
    `https://public-api.wordpress.com/rest/v1/sites/200671771/posts/slug:${slug}`
  );

  return await res.json();
}

export function createMarkup(html: string) {
  return { __html: html };
}
