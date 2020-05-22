export const elements = {
  searchInput: getElement('.search__field'),
  searchForm: getElement('.search'),
  resultsList: getElement('.results__list'),
};

function getElement(selector) {
  return document.querySelector(selector);
}
