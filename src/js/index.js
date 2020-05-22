import { Search } from './models/Search';

const state = {};

const searchController = async () => {
  const query = 'pizza';

  const search = new Search(query);
  state.search = search;

  await state.search.getResults();

  console.log(state.search.result);
};

document.querySelector('.search').addEventListener('submit', (e) => {
  e.preventDefault();
  searchController();
});
