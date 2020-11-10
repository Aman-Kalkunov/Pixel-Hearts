import { toJson } from 'unsplash-js';
import {
  addPhotos,
  setUnsplash,
  setCard,
  deleteCard,
  setLike,
  setUnLike,
  setFetchError
} from '../reduсers/photosReducer';

//Получение случайного фото для загрузки на главную страницу
export const getRandomPhoto = async (unsplash, setRandomPhoto) => {
  const response = await
    unsplash.photos.getRandomPhoto()
      .then(toJson)
      .then(json => {
        return json
      });
  setRandomPhoto(response)
}

//Получение объекта "Unsplash" для загрузки в "state"
export const getUnsplash = (unsplash) => {
  return async (dispatch) => {
    await unsplash;
    dispatch(setUnsplash(unsplash))
  }
}

//Получение фотографий для загрузки в массив фотографий "state.arrayPhotos"
export const getPhotos = (unsplash) => {
  return async (dispatch) => {
    try {
      const response = await
        unsplash.photos.listPhotos(counter(), 9, "latest") //счетчик дляобновления страницы
          .then(toJson)
          .then(json => {
            return json;
          })
      dispatch(addPhotos(response))
    } catch (e) {
      dispatch(setFetchError(true)) //При возникновении ошибки меняем флаг ошибки
      console.log(e)                //выводим сообщение в консоль 
      setTimeout(() => {
        dispatch(setFetchError(false)) //убираем сообщение через три секунды
      }, 3000)
    }

  }
}

//Получение объекта одной фотографии по "id" для загрузки в "state.card"
export const getOnePhoto = (unsplash, photoId) => {
  return async (dispatch) => {
    try {
      const response = await
        unsplash.photos.getPhoto(photoId)
          .then(toJson)
          .then(json => {
            return json;
          })
      dispatch(setCard(response))
    } catch (e) {
      dispatch(setFetchError(true))
      console.log(e)
      setTimeout(() => {
        dispatch(setFetchError(false))
      }, 3000)
    }
  }
}

//Очищаем "state.card", передавая пустой массив
export const deletePhoto = () => {
  return (dispatch) => {
    const response = {};
    dispatch(deleteCard(response))
  }
}

//Отправляем запрос на "like",
//возвращаем количество лайков и значение "liked_by_user"
export const getLike = (unsplash, photoId) => {
  return async (dispatch) => {
    try {
      const response = await
        unsplash.photos.likePhoto(photoId)
          .then(toJson)
          .then(json => {
            const info = {
              liked_by_user: json.photo.liked_by_user,
              likes: json.photo.likes,
            }
            return info;
          })
      dispatch(setLike(response))
    } catch (e) {
      dispatch(setFetchError(true))
      console.log(e)
      setTimeout(() => {
        dispatch(setFetchError(false))
      }, 3000)
    }
  }
}

//Отправляем запрос на "unlike",
//возвращаем количество лайков и значение "liked_by_user"
export const getUnLike = (unsplash, photoId) => {
  return async (dispatch) => {
    try {
      const response = await
        unsplash.photos.unlikePhoto(photoId)
          .then(toJson)
          .then(json => {
            const info = {
              liked_by_user: json.photo.liked_by_user,
              likes: json.photo.likes,
            }
            return info;
          })
      dispatch(setUnLike(response))
    } catch (e) {
      dispatch(setFetchError(true))
      console.log(e)
      setTimeout(() => {
        dispatch(setFetchError(false))
      }, 3000)
    }
  }
}

// Функция счетчика для обновления номера загружаемой страницы
let counter = makeCounter();
function makeCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}