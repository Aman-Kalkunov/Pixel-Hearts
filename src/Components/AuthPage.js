import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toJson } from 'unsplash-js';
import { unsplash } from '../unsplash/unsplash';
import { deletePhoto } from '../actions';
import PhotoList from './PhotoList';

//Получаем token из LocalStorage
const token = JSON.parse(localStorage.getItem('token'));

//Если token отсутствует, получаем его
//помещаем в объект unsplash как BearerToken
//помещаем в LocalStorage
if (!token) {
  const code = window.location.search.split('code=')[1];
  if (code) {
    unsplash.auth.userAuthentication(code)
      .then(toJson)
      .then(json => {
        unsplash.auth.setBearerToken(json.access_token);
        localStorage.setItem('token', JSON.stringify(json.access_token));
      });
  }
  // если token обнаружен
  //помещаем его в объект unsplash как BearerToken
} else {
  unsplash.auth.setBearerToken(token);
}

let AuthPage = () => {  

  const dispatch = useDispatch();
  const isFetchError = useSelector(state => state.photos.isFetchError);

  //при рендеринге вызываем action очищающий state.card 
  useEffect(() => {
    dispatch(deletePhoto())
  }, [])

  return (
    <div>
      { isFetchError &&
        <div className="error">
          Произошла ошибка! Повторите попытку.
        </div>
      }
      <PhotoList unsplash={unsplash} />
    </div>
  )
}

export default AuthPage;