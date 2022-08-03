import { useState } from 'react';
import pixFetch, { resetPage } from 'service/pixabay';
import { BallTriangle } from 'react-loader-spinner';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [clickedImg, setClickedImg] = useState({});

  //Method to fetch and render data on search submit
  //It will reset PAGE_COUNTER for fetch
  //Status state changing to pending to show spinner
  const onSubmit = searchValue => {
    resetPage();
    setStatus('pending');
    setSearchQuery(searchValue);
    pixFetch(searchValue)
      .then(data => onHandleData(data.hits))
      .catch(error => console.log(error));
  };

  //Method to handle data received from search submit
  //Status state changing to loaded to show Load More button
  function onHandleData(data) {
    setStatus('loaded');
    setPhotos(data);
  }

  //Method to fetch data on clicking Load More button
  //Pagination will continue from submitted query
  //Status state changing to pending to show spinner
  const onLoadMore = () => {
    setStatus('pending');
    pixFetch(searchQuery)
      .then(data => onHandleMoreData(data.hits))
      .catch(error => console.log(error));
  };

  //Method to handle data received from search submit
  //Status state changing to loaded to show Load More button
  function onHandleMoreData(data) {
    setStatus('loaded');
    setPhotos(prevData => [...prevData, ...data]);
  }

  //Method to determine which picture user clicked
  //Storing clicked image object in state
  //Displaying modal window
  const onHandleClick = click => {
    const foundImage = photos.find(photo => photo.tags === click);
    setClickedImg(foundImage);
    setShowModal(true);
  };

  //Method to close Modal window
  const onCloseModal = () => {
    setShowModal(false);
  };

  const spinnerStyle = { justifyContent: 'center' };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery>
        <ImageGalleryItem photos={photos} onHandleClick={onHandleClick} />
      </ImageGallery>

      {status === 'pending' && (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle={spinnerStyle}
          visible={true}
        />
      )}

      {status === 'loaded' && <Button onLoadMore={onLoadMore} />}

      {showModal && (
        <Modal photo={clickedImg} onCloseModal={onCloseModal}></Modal>
      )}
    </>
  );
}

export default App;
