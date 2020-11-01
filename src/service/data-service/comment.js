'use strict';

class CommentService {
  // метод который возвращает все комментарии
  findAll(offer) {
    return offer.comments;
  }

}

module.exports = CommentService;