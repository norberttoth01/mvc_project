import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export function clearList() {
  elements.resultsList.innerHTML = '';
}

function renderRecipe(recipe) {
  const recipeHtml = `<li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;

  elements.resultsList.insertAdjacentHTML('beforeend', recipeHtml);
}

const createBtn = (type, page) => {
  const btnHTML = `
        <button class="btn-inline results__btn--${type}" data-goto="${page}">
        <span>Page  ${page}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${
                          type === 'prev' ? 'left' : 'right'
                        }"></use>
                    </svg>
            </button>`;
  return btnHTML;
};

const renderBtns = (numberOfRecipes, page, recipePerPage) => {
  const numberOfPages = Math.ceil(numberOfRecipes / recipePerPage);

  let btns;

  if (page === 1 && numberOfPages > 1) {
    btns = createBtn('next', page + 1);
  } else if (page > 1 && page < numberOfPages) {
    btns = `
        ${createBtn('prev', page - 1)}
        ${createBtn('next', page + 1)}`;
  } else if (page === numberOfPages) {
    btns = createBtn('prev', page - 1);
  }
  if (btns) {
    elements.pagination.insertAdjacentHTML('afterbegin', btns);
  }
};

export const removBtns = () => {
  elements.pagination.innerHTML = '';
};

export const renderResults = (results, page = 1, recipePerPage = 10) => {
  const start = (page - 1) * recipePerPage;
  const end = page * recipePerPage;
  const recipes = results.slice(start, end);
  recipes.forEach(renderRecipe);
  renderBtns(results.length, page, recipePerPage);
};
