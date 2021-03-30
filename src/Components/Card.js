import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { getOnePhoto } from '../actions/index.js';
import Like from './Like.js';
import Loader from './Loader.js';

const Card = () => {
  const dispatch = useDispatch();
  const id = useParams();

  const unsplash = useSelector(state => state.photos.unsplash);
  const card = useSelector(state => state.photos.card);
  const isFetchError = useSelector(state => state.photos.isFetchError);

  const isCard = (Object.keys(card).length !== 0);

  //при рендеринге вызываем action помещающий объект фотографии в state.card 
  useEffect(() => {
    dispatch(getOnePhoto(unsplash, id.id))
  }, []);

  //при возникновении ошибки перенаправляем на страницу авторизации
  if (isFetchError) {
    return <Redirect to="/oauth" />
  }

  //пока объект state.card пуст, рендерим Loader
  if (isCard) {
    const URL = card.user.links.html,
      profileURL = card.user.profile_image.small,
      userName = card.user.name,
      imgURL = card.urls.regular,
      time = card.created_at.split('T')[0].replace(/-/gi, '.');

    return (
      <div className="container">
        <div className="card">
          <a href={URL} target="blank" className="user">
            <img className="user__avatar" src={profileURL} alt="profile_image" />
            <h3 className="user__name">{userName}</h3>
          </a>
          <img className="card__img" src={imgURL} alt="Изображение" />
          <div className="photo-list__info">
            <Like />
            <time className="like__date" datatime={time}>{time}</time>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="infinite-scroll-component"><Loader /></div>
    )
  }
}

export default Card;