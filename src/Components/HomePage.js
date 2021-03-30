import React, { useEffect, useState } from 'react';
import { unsplash } from '../unsplash/unsplash';
import { getRandomPhoto } from '../actions';
import Loader from './Loader';

const HomePage = () => {

  // Удаляем token из LocalStorage чтобы избежать ошибки при авторизации
  localStorage.removeItem("token");
  const [randomPhoto, setRandomPhoto] = useState(null);

  useEffect(() => {
    getRandomPhoto(unsplash, setRandomPhoto);
  }, []);

  //Собираем запрос на авторизацию
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes",
  ]);
  const authLocation = () => { window.location.assign(authenticationUrl) }

  //Отправляем запрос по клику
  const buttonLogClick = () => {
    authLocation();
  }

  if (randomPhoto !== null) {
    const img = randomPhoto.urls.regular;
    return (
      <div className="container">
        <div className="home-page" style={{
          backgroundImage: 'url(' + img + ')'
        }}>
          <button onClick={buttonLogClick} className="button" >Log In</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="infinite-scroll-component"><Loader /></div>
    )
  }
}

export default HomePage;
