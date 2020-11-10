import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

let Photo = (props) => {
  const element = <FontAwesomeIcon icon={faHeart} />
  const photo = props.photo;
  const time = photo.created_at.split('T')[0].replace(/-/gi, '.');
  let isLike = photo.liked_by_user;
  
  return (
    <li className="photo-list__cell">
      <a href={photo.user.links.html} target="blank" className="user">
        <img className="user__avatar" src={photo.user.profile_image.small} alt="avatar" />
        <h3 className="user__name">{photo.user.name}</h3>
      </a>
      <NavLink to={`/card/${photo.id}`}>
        <img className="photo-list__img" src={photo.urls.small} alt="Изображение" />
      </NavLink>
      <div className="photo-list__info">
        <div className="like like__container">
          <i className={isLike ? "like__heard press" : "like__heard"}>{element}</i>
          <p className="like__count">{photo.likes}</p>
        </div>
        <time className="like__date" dateTime={photo.created_at}>{time}</time>
      </div>
    </li>
  )
}

export default Photo;

