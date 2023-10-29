const apiUrl = 'https://dev.to/api/articles?tag=web-development&published_at_min=2023-01-01';

export async function fetchArticles() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // Handle the API response data here
    // eslint-disable-next-line no-console
    console.log(data);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
  }
}
