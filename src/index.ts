import { fetchArticles } from '$utils/api';

window.Webflow ||= [];
window.Webflow.push(() => {
  const articlesData = fetchArticles();

  const itemTemplate = document.querySelector<HTMLAnchorElement>('[item-element="item-article"]');
  if (!itemTemplate) return;

  const itemList = itemTemplate.parentElement;
  itemTemplate.remove();
});
