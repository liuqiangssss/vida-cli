import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.ts';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
          <Provider store={store}>
            <div> hello world</div>
          </Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
