'use strict';

class CommentService {
  // метод который возвращает все комментарии
  findAll(offer) {
    return offer.comments;
  }

  // метод который удаляет из определённой публикации комментарий с идентификатором
  drop(offer, commentId) {
    const dropComment = offer.comments
      .find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    offer.comments = offer.comments
      .filter((item) => item.id !== commentId);

    return dropComment;
  }
}

module.exports = CommentService;