// v1
export async function fetchArticles(): Promise<Array<HackerNewsArticle>> {
  //const WEBHOSE_API_URL = 'https://www.reddit.com/r/webdev/new.json';
  //const WEBHOSE_API_URL = 'https://example.com/api/latestWebDevArticles';
  const URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';

  // Make a GET request to the Webhose.io API endpoint.
  const response = await fetch(URL);

  // Check if the response was successful.
  if (response.status !== 200) {
    throw new Error('Failed to fetch latest web development articles.');
  }

  // Parse the JSON response into an array.
  const data = await response.json();

  // Get the top 5 article IDs.
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

// Interface for a Hacker News article.
interface HackerNewsArticle {
  id: number;
  title: string;
  url: string;
  tags: Array<string>;
}
