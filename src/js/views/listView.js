import { elements } from './base.js';

export const renderLitItem = (item) => {
  const itemHtml = `
    <li class="shopping__item" data-itemId=${item.id}>
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
</li>
    `;
  elements.shoppingList.insertAdjacentHTML('beforeend', itemHtml);
};

export const removeItem = (id) => {
  const item = elements.shoppingList.querySelector(`[data-itemId="${id}"]`);
  item.remove();
};
