// import { Component } from 'react';
import { useEffect, useState } from 'react';
import { getImages } from '../../services/Api';
import { NotificationContainer, notifyWarning } from '../Notification';
import ImageGallery from '../ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Tittle from '../MainTittle';
import { Container } from './App.styled';

import Button from '../Button';
import Loader from '../Loader';

const App = () => {
  const [items, setItems] = useState([]);
  const [findQuery, setFindQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (findQuery === '') return;

    try {
      setStatus('load');
      getImages({ query: findQuery, page: currentPage }).then(response => {
        if (response.totalHits === 0) {
          setStatus('notFound');
          return notifyWarning(
            `Sorry, nothing was found on request "${findQuery}"`
          );
        }

        setItems(state => [...state, ...response.hits]);

        if (response.hits.length < 12 || response.total < 12) {
          return setStatus('noMore');
        }
        setStatus('loadMore');
      });
    } catch (error) {
      setStatus(error.message);
      notifyWarning(error.message);
    }
  }, [currentPage, findQuery]);

  const handleSabmitForm = value => {
    setFindQuery(value);
    setCurrentPage(1);
    setItems([]);
  };

  const increasePage = () => {
    setCurrentPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSabmitForm} />
      <ImageGallery items={items} />

      {(status === 'pending' && (
        <Tittle>Search and find pictures of anything!</Tittle>
      )) ||
        (status === 'notFound' && <Tittle>Try again !</Tittle>)}

      {status === 'load' && <Loader />}
      {status === 'loadMore' && <Button onClick={increasePage} />}

      <NotificationContainer />
    </Container>
  );
};

export default App;
