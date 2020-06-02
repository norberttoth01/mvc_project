import { elements } from './base';

export const toggleLikeBtn = (isLiked) => {
  const iconString = 'img/icons.svg#icon-heart' + (isLiked ? '-outlined' : '');
  document.querySelector('.recipe__love use').setAttribute('href', iconString);
};

export const toggleLikeMenu = (numOfLikes) => {
  elements.likesMenu.style.visibility = numOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (like) => {
  const likeHtml = ` <li>
  <a class="likes__link" href="#${like.id}">
      <figure class="likes__fig">
          <img src="${like.img}" alt="Test">
      </figure>
      <div class="likes__data">
          <h4 class="likes__name">${like.title}</h4>
          <p class="likes__author">${like.author}</p>
      </div>
  </a>
</li>`;

  elements.likesList.insertAdjacentHTML('beforeend', likeHtml);
};

export const removeLike = (id) => {
  const el = document.querySelector(`.likes__link[href="#${id}"]`)
    .parentElement;

  if (el) {
    el.remove();
  }
};
