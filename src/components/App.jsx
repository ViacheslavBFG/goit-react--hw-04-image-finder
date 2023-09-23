import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import API from './API/PixabayService';

import ImageGallery from './Modules/ImageGallery/ImageGallery';
import SearchBar from './Modules/Searchbar/Searchbar';
import Button from './Modules/Button/Button';
import { Loader } from './Modules/Loader/Loader';

import Modal from './Modules/Modal/Modal';
// import css from './app.css';

const App = () => {
  const [modal, setModal] = useState({ isOpen: false, largeImageURL: '' });
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  //searchForm submit and setting query and page for the first search
  const onSubmitSearch = query => {
    setSearchQuery(query);
    setImages([]);
    setCurrentPage(1);
    setTotalImages(0);
  };

  //uploading more pages upon current search
  const onPageUpload = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const fetchImages = async (query, page) => {
    try {
      setLoading(true);

      const data = await API(query, page);

      if (data.totalHits === 0) {
        Notiflix.Notify.warning(
          `There is no results upon your ${query}, please try again...`
        );
        return;
      }

      setImages(prevState => {
        return [...prevState, ...data.hits];
      });

      setTotalImages(data.totalHits);
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  //work with modal
  const onModalOpen = data => {
    setModal({
      isOpen: true,
      largeImageURL: data,
    });
  };

  const onModalClose = () => {
    setModal({
      isOpen: false,
      largeImageURL: '',
    });
  };

  const showBtn = !loading && images.length !== totalImages;

  return (
    <div>
      <SearchBar onSubmit={onSubmitSearch} />
      {loading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onModalOpen={onModalOpen} />
      )}
    

      {showBtn && <Button onPageUpload={onPageUpload} />}

      {modal.isOpen && (
        <Modal
          largeImageURL={modal.largeImageURL}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
};

export default App;