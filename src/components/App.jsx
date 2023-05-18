import { useState, useEffect } from 'react';
import pixFetch, { resetPage } from 'service/pixabay';
import { BallTriangle } from 'react-loader-spinner';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Searchbar from './Searchbar';
import Button from './Button';
import Modal from './Modal';
import { createPortal } from 'react-dom';

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [clickedImg, setClickedImg] = useState({});

  useEffect(() => {
    if (status === 'pending') {
      setStatus('loading');
      pixFetch(searchQuery)
        .then(data => onHandleData(data.hits))
        .catch(error => console.log(error));
    }
  }, [searchQuery, status]);

  //Method to fetch and render data on search submit
  //It will reset PAGE_COUNTER for fetch
  //Status state changing to pending to show spinner
  const onSubmit = searchValue => {
    resetPage();
    setStatus('pending');
    setPhotos([]);
    setSearchQuery(searchValue);
  };

  //Method to fetch data on clicking Load More button
  //Pagination will continue from submitted query
  //Status state changing to pending to commence fetch
  const onLoadMore = () => {
    setStatus('pending');
  };

  //Method to handle data received from search submit
  //Status state changing to loaded to show Load More button
  function onHandleData(data) {
    if (data.length === 12) {
      setStatus('loaded');
      setPhotos(prevData => [...prevData, ...data]);
      return;
    }
    if (data.length === 0) {
      setStatus('rejected');
      setPhotos([]);
      return;
    }
    setStatus('idle');
    setPhotos(prevData => [...prevData, ...data]);
    return;
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

      {status === 'loading' && (
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

      {status === 'rejected' && (
        <div>
          Your generic alert to promt you that there are no images found, but I
          was too lazy to style it. Hell, at least it removed that "Load More"
          button from showing
        </div>
      )}

      {showModal &&
        createPortal(
          <Modal Modal photo={clickedImg} onCloseModal={onCloseModal}></Modal>,
          document.body
        )}
    </>
  );
}

export default App;
