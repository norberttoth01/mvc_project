export class Likes {
  constructor() {
    this.likes = [];
  }
  addLike(id, title, author, img) {
    const like = {
      id,
      title,
      author,
      img,
    };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.findLikedItem(id);
    this.likes.splice(index, 1);
  }
  isLiked(id) {
    return this.findLikedItem(id) !== -1;
  }

  findLikedItem(id) {
    return this.likes.findIndex((like) => like.id === id);
  }

  getNumLikes() {
    return this.likes.length;
  }
}
