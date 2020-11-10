import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { getLike, getUnLike } from '../actions';

let Like = () => {
  const dispatch = useDispatch()

  const element = <FontAwesomeIcon icon={faHeart} />
  const unsplash = useSelector(state => state.photos.unsplash);
  const card = useSelector(state => state.photos.card);
  const id = card.id;

  let isLike = card.liked_by_user;
  let counLike = card.likes;

  // в зависимости от значения isLike,
  // вызывает action лайка или дизлайка
  const clickLikeButton = () => {
    isLike ?
      dispatch(getUnLike(unsplash, id)) :
      dispatch(getLike(unsplash, id));
  }

  return (
    <div className="like like__container">
      <button onClick={clickLikeButton} className="like__button">
        <i className={isLike ? "like__heard press" : "like__heard"}>{element}</i>
      </button>
      <p className="like__count">{counLike}</p>
    </div>
  )
}

export default Like;