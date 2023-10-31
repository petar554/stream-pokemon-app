import { cloneNode } from '@finsweet/ts-utils';

import { fetchArticles } from '$utils/api';
import type { ArticleItem } from '$utils/types';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const articlesData = await fetchArticles();

  const itemTemplate = document.querySelector<HTMLAnchorElement>('[item-element="item-article"]');
  if (!itemTemplate) return;

  const itemsList = itemTemplate.parentElement!;
  itemTemplate.remove();

  const articles = articlesData.map((articleData) => createArticleItem(articleData, itemTemplate));

  itemsList.append(...articles);
});

/**
 * It creates a new item for the articles list.
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
