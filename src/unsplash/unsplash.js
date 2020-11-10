import Unsplash from 'unsplash-js';

// Получаем новый экземпляр объекта "Unsplash" и экспортируем
export const unsplash = new Unsplash({
  accessKey: "RSRl5JCVUVQly17-CSOWQBAHksl6IGROQtl0PfTlOuI",
  secret: "EhXVqQhG9mKTtChB7Sn5gkFuCx5RLPCVxMGt318_8EU",
  callbackUrl: "http://charlie-mcfly.ru/oauth"
});