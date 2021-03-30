import { toJson } from 'unsplash-js';
import {
  addPhotos,
  setUnsplash,
  setCard,
  deleteCard,
  setLike,
  setUnLike,
  setLikeCard,
  setUnLikeCard,
  setFetchError
} from '../reduсers/photosReducer';

//Получение случайного фото для загрузки на главную страницу
export const getRandomPhoto = (unsplash, setRandomPhoto) => {
  unsplash.photos.getRandomPhoto()
    .then(toJson)
    .then(json => {
      setRandomPhoto(json)
    })
}

//Получение объекта "Unsplash" для загрузки в "state"
export const getUnsplash = (unsplash) => {
  return (dispatch) => {
    dispatch(setUnsplash(unsplash))
  }
}

//Получение фотографий для загрузки в массив фотографий "state.arrayPhotos"
export const getPhotos = (unsplash) => {
  return (dispatch) => {
    try {
      unsplash.photos.listPhotos(counter(), 9, "latest") //счетчик дляобновления страницы
        .then(toJson)
        .then(json => {
          dispatch(addPhotos(json));
        })
        .catch(error => setError(error, dispatch))
    } catch (error) {
      setError(error, dispatch)
    }
  }
}

//Получение объекта одной фотографии по "id" для загрузки в "state.card"
export const getOnePhoto = (unsplash, photoId) => {
  return (dispatch) => {
    try {
      unsplash.photos.getPhoto(photoId)
        .then(toJson)
        .then(json => {
          dispatch(setCard(json));
        })
        .catch(error => setError(error, dispatch))
    } catch (error) {
      setError(error, dispatch)
    }
  }
}

//Очищаем "state.card", передавая пустой массив
export const deletePhoto = () => {
  return (dispatch) => {
    dispatch(deleteCard({}))
  }
}

//Отправляем запрос на "like",
//возвращаем количество лайков и значение "liked_by_user"
export const getLikeCard = (unsplash, photoId) => {
  return (dispatch) => {
    try {
      unsplash.photos.likePhoto(photoId)
        .then(toJson)
        .then(json => {
          const info = {
            liked_by_user: json.photo.liked_by_user,
            likes: json.photo.likes,
          }
          dispatch(setLikeCard(info));
        })
        .catch(error => setError(error, dispatch))
    } catch (error) {
      setError(error, dispatch)
    }
  }
}

//Отправляем запрос на "unlike",
//возвращаем количество лайков и значение "liked_by_user"
export const getUnLike = (unsplash, photoId, index) => {
  return (dispatch) => {
    try {
      unsplash.photos.unlikePhoto(photoId)
        .then(toJson)
        .then(json => {
          const info = {
            index,
            liked_by_user: json.photo.liked_by_user,
            likes: json.photo.likes,
          }
          dispatch(setUnLike(info));
        })
        .catch(error => setError(error, dispatch))
    } catch (error) {
      setError(error, dispatch)
    }
  }
}

//Отправляем запрос на "like",
//возвращаем количество лайков и значение "liked_by_user"
export const getLike = (unsplash, photoId, index) => {
  return (dispatch) => {
    try {
      unsplash.photos.likePhoto(photoId)
        .then(toJson)
        .then(json => {
          const info = {
            index,
            liked_by_user: json.photo.liked_by_user,
            likes: json.photo.likes,
          }
          dispatch(setLike(info));
        })
        .catch(error => setError(error, dispatch))
    } catch (error) {
      setError(error, dispatch)
    }
  }
}

//Отправляем запрос на "unlike",
//возвращаем количество лайков и значение "liked_by_user"
export const getUnLikeCard = (unsplash, photoId) => {
  return (dispatch) => {
    try {
      unsplash.photos.unlikePhoto(photoId)
        .then(toJson)
        .then(json => {
          const info = {
            liked_by_user: json.photo.liked_by_user,
            likes: json.photo.likes,
          }
          dispatch(setUnLikeCard(info));
        })
        .catch(error => setError(error, dispatch))
    } catch (error) {
      setError(error, dispatch)
    }
  }
}

function setError(error, dispatch) {
  dispatch(setFetchError(true))
  console.log(error.message)
  setTimeout(() => {
    dispatch(setFetchError(false))
  }, 3000)
}

// Функция счетчика для обновления номера загружаемой страницы
let counter = makeCounter();
function makeCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}