export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchForm: document.querySelector('.search'),
  resultsList: document.querySelector('.results__list'),
  results: document.querySelector('.results'),
};

export const renderLoader = (parent) => {
  const spinnerHTML = `
        <div class="loader">
            <svg> 
                <use href="img/icons.svg#icon-cw""></use>
            </svg>
        </div>
    `;

  parent.insertAdjacentHTML('afterbegin', spinnerHTML);
};

export const removeLoader = (parent) => {
  parent.removeChild(document.querySelector('.loader'));
};
