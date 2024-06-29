import { CommentType } from '../../types/data';

/**
 * Делает запрос методом fetch комментариев по их id.
 * @param {string[]} ids - массив id комментариев.
 * @returns {Promise<CommentType[]>} промис, который пр резолве вернет массив элементов типа Comment.
 */

export async function fetchComments(ids: string[]) {
  if (ids !== null && ids !== undefined) {
    return await Promise.all(ids.map(id => fetchComment(id)));
  }
}


/**
 * Функция получает комментарий из API Hacker News по идентификатору комментария.
 * @param {string} commentId - Идентификатор комментария.
 * @returns {Promise<CommentType>} промис, который при резолве вернет объект типа Comment.
 */

export async function fetchComment(commentId: string): Promise<CommentType> {
  return await fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).then(res => res.json());
}
