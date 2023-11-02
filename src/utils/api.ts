import type { ArticleItem } from '$utils/types';

export async function fetchArticles(): Promise<Array<ArticleItem>> {
  const URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  const response = await fetch(URL);

  if (response.status !== 200) {
    throw new Error('Failed to fetch latest web development articles.');
  }

  // Parse the JSON response into an array.
  const data = await response.json();

  const top5ArticleIds = data.slice(0, 5);

  const articles = await Promise.all(
    top5ArticleIds.map(async (id: any) => {
      const articleResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      const articleData = await articleResponse.json();
      return articleData;
    })
  );

  return articles;
}
