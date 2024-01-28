import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';
import './App.css';
import { click } from '@testing-library/user-event/dist/click';

interface ClicksData {
  clicks: number;
}

function App() {
  const [clicks, setClicks] = React.useState(0);

  React.useEffect(function () {
    fetch('http://localhost:8000/clicks')
      .then(function (response) {
        return response.json();
      })
      .then(function (data: ClicksData) {
        setClicks(data.clicks);
      });
  }, []);

  function increaseClicks() {
    setClicks(clicks + 1);

    const data: ClicksData = {
      clicks: clicks + 1,
    };

    fetch('http://localhost:8000/clicks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  function resetClicks() {
    setClicks(0);

    fetch('http://localhost:8000/clicks', {
      method: 'DELETE',
    });
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <RedButton onClick={increaseClicks}>Do not Push!</RedButton>
        <Counter>И всё же ты нажал {clicks} раз</Counter>{' '}
        {/* как сделать раз/разы */}
        <BlueButton onClick={resetClicks}>reset</BlueButton>
      </header>
    </div>
  );
}

export default App;

const RedButton = styled.button({
  height: 200,
  width: 200,
  backgroundColor: '#E80000',
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: 700,
  borderRadius: '50%',
  border: '3px solid #FFFFFF',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#D80000',
  },
  '&:active': {
    backgroundColor: '#D80000',
  },
});

const Counter = styled.p({
  fontSize: 24,
  color: '#FFFFFF',
});
const BlueButton = styled.button({
  height: 50,
  width: 200,
  backgroundColor: '#0000FF',
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: 700,
  borderRadius: '15px',
  border: '2px solid #FFFFFF',
  cursor: 'pointer',
});
