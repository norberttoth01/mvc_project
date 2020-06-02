import { Search } from './models/Search';
import { Recipe } from './models/Recipe';
import { List } from './models/List';
import { Likes } from './models/Likes';
import { elements, renderLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

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
    const isLiked = state.likes && state.likes.isLiked(id);
    if (state.search) searchView.highlightSelected(id);

try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      removeLoader(elements.recipe);
      recipeView.renderRecipe(state.recipe, isLiked);
    } catch (err) {
      console.log(err);
      alert(err);
    }
}
};

const listController = () => {
  if (!state.list) {
    state.list = new List();
  }
  state.recipe.ingredients.forEach((ing) => {
    const item = state.list.addItem(ing);
    listView.renderLitItem(item);
  });
};

likesView.toggleLikeMenu(state.likes && state.likes.getNumLikes());
const likeController = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;
  const isLiked = state.likes.isLiked(currentId);
  if (!isLiked) {
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    likesView.renderLike(newLike);
  } else {
    state.likes.deleteLike(currentId);
    likesView.removeLike(currentId);
    console.log(state.likes);
  }
  likesView.toggleLikeBtn(isLiked);
  likesView.toggleLikeMenu(state.likes.getNumLikes());
  likesView;
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
    recipeView.updateIngredients(state.recipe);
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add * ')) {
    listController();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    likeController();
  }
});

elements.shoppingList.addEventListener('click', (e) => {
  const itemId = e.target.closest('.shopping__item').dataset.itemid;

  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(itemId);
    listView.removeItem(itemId);
  }
});
