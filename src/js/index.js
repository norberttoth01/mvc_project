import { Search } from './models/Search';
import { elements, renderLoader, removeLoader } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const searchController = async () => {
  const query = searchView.getInput();

  if (query) {
    searchView.clearList();
    renderLoader(elements.results);

    const search = new Search(query);
    state.search = search;

    await state.search.getResults();
    searchView.clearInput();
    removeLoader(elements.results);
    searchView.renderResults(state.search.result);
  } else {
    alert('Type a food name');
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchController();
});
