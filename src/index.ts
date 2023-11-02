import { cloneNode } from '@finsweet/ts-utils';

import { fetchArticles } from '$utils/api';
import { charts } from '$utils/charts';
import type { ArticleItem } from '$utils/types';

window.Webflow ||= [];
window.Webflow.push(async () => {
  // get articles
  const articlesData = await fetchArticles();

  const itemTemplate = document.querySelector<HTMLAnchorElement>('[item-element="item-article"]');
  if (!itemTemplate) return;

  const itemsList = itemTemplate.parentElement!;
  itemTemplate.remove();

  // preparing articles for Webflow
  const articles = articlesData.map((articleData) => createArticleItem(articleData, itemTemplate));
  itemsList.append(...articles);

  // get charts
  charts();
});

/**
 * It creates a new article.
 * @param articleItem
 * @param articleTemplate
 */
const createArticleItem = (articleItem: ArticleItem, articleTemplate: HTMLAnchorElement) => {
  const item = cloneNode(articleTemplate);
  item.href = articleItem.url;

  const title = item.querySelector<HTMLDivElement>('[item-element="item-title"]');
  if (title) {
    title.textContent = articleItem.title;
  }

  item.removeAttribute('item-clock');

  return item;
};
