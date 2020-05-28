import { Search } from './models/Search';
import { elements, renderLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';

const state = {};

const searchController = async () => {
  const query = searchView.getInput();

  if (query) {
    searchView.clearList();
    searchView.removBtns();
    renderLoader(elements.results);

    const search = new Search(query);
    state.search = search;
    try {
      await state.search.getResults();
      searchView.clearInput();
      removeLoader(elements.results);
      searchView.renderResults(state.search.result);
    } catch (err) {
      searchView.clearInput();
      removeLoader(elements.results);
      console.log(err);
      alert(err);
    }
  } else {
    alert('Type a food name');
  }
};

const recipeController = async () => {
  const id = window.location.hash.replace('#', '');

  if (id) {
    recipeView.removeRecipe();
    renderLoader(elements.recipe);
    state.recipe = new Recipe(id);
    if (state.search) searchView.highlightSelected(id);

    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      removeLoader(elements.recipe);
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchController();
});

elements.pagination.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (btn) {
    paginationHandler(+btn.dataset.goto);
  }
});

const paginationHandler = (pageToGo) => {
  searchView.clearList();
  searchView.removBtns();
  searchView.renderResults(state.search.result, pageToGo);
};

['hashchange', 'load'].forEach((event) => {
  window.addEventListener(event, recipeController);
});

elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) state.recipe.updateServings('dec');
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
  }
  recipeView.updateIngredients(state.recipe);
});
