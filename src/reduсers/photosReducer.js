const ADD_PHOTOS = "ADD_PHOTOS"; // Добавить фотографии в массив ""
const SET_UNSPLASH = "SET_UNSPLASH"; // Добавить объект "unsplash" в "state.unsplash"
const SET_CARD = "SET_CARD"; // Добавить объект "card" в "state.card"
const DELETE_CARD = "DELETE_CARD"; // Очистить объект "" 
const SET_UNLIKE = "SET_UNLIKE"; // Поставить лайк
const SET_LIKE = "SET_LIKE"; // Снять лайк
const SET_FETCH_ERROR = "SET_FETCH_ERROR"; // Поменять флаг ошибки 

const defaultState = {
  unsplash: {},
  arrayPhotos: [],
  card: {},
  isFetchError: false,
};

export default function photosReducer(state = defaultState, action) {
  switch (action.type) {
    case ADD_PHOTOS:
      return {
        ...state,
        arrayPhotos: [
          ...state.arrayPhotos,
          ...action.payload
        ],
      }

    case SET_UNSPLASH:
      return {
        ...state,
        unsplash: action.payload

      }

    case SET_CARD:
      return {
        ...state,
        card: {
          ...action.payload
        }
      }

    case DELETE_CARD:
      return {
        ...state,
        card: action.payload

      }

    case SET_LIKE:
      state.card.likes = action.payload.likes;
      state.card.liked_by_user = action.payload.liked_by_user;
      return {
        ...state,
        card: {
          ...state.card,
        }
      }

    case SET_UNLIKE:
      state.card.likes = action.payload.likes;
      state.card.liked_by_user = action.payload.liked_by_user;
      return {
        ...state,
        card: {
          ...state.card,
        }
      }

    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload
      }

    default:
      return state;
  }
}

export const addPhotos = (array) => {
  return ({ type: ADD_PHOTOS, payload: array })
};

export const setUnsplash = (unsplash) => {
  return ({ type: SET_UNSPLASH, payload: unsplash })
};

export const setCard = (obj) => {
  return ({ type: SET_CARD, payload: obj })
};

export const deleteCard = (obj) => {
  return ({ type: DELETE_CARD, payload: obj })
};

export const setLike = (obj) => {
  return ({ type: SET_LIKE, payload: obj })
};

export const setUnLike = (obj) => {
  return ({ type: SET_UNLIKE, payload: obj })
};

export const setFetchError = (bool) => {
  return ({ type: SET_FETCH_ERROR, payload: bool })
}