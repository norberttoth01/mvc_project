import { Search } from './models/Search';
import { elements } from './views/base';
import * as searchView from './views/searchView';

const state = {};

const searchController = async () => {
  const query = searchView.getInput();

  const search = new Search(query);
  state.search = search;

  await state.search.getResults();

  searchView.renderResults(state.search.result);
};

console.log(elements.searchForm);
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchController();
});
