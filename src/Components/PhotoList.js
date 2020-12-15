import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPhotos, getUnsplash } from '../actions/index.js';
import Loader from './Loader.js';
import Photo from './Photo.js';

let PhotoList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const unsplash = props.unsplash;
  const photos = useSelector(state => state.photos.arrayPhotos);

  //при рендеринге добавляем первые 9 фотографий только если массив пуст
  //вызываем action, который внесет unsplash в state.unsplash
  useEffect(() => {
    if (photos.length === 0) {
      fetchPhotos();
      dispatch(getUnsplash(unsplash))
    }
    history.push("/oauth");
  }, [])

  //функция вызывает ation, который добавит новые фотографии в массив state.arrayPhotos
  const fetchPhotos = () => {
    dispatch(getPhotos(unsplash));
  }

  return (
    <InfiniteScroll
      dataLength={photos}
      next={fetchPhotos}
      hasMore={true}
      loader={<Loader />}
    >
      <div className="container">
        <ul className="photo-list">
          {photos.map(photo => {
            return <Photo photo={photo} key={photo.id} />
          })}
        </ul>
      </div>
    </InfiniteScroll>
  )
}

export default PhotoList;