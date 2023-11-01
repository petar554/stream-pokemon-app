import { cloneNode } from '@finsweet/ts-utils';
import { Chart } from 'chart.js/auto';

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

  const ctx = document.querySelector<HTMLCanvasElement>('[data-element="chart"]');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
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
