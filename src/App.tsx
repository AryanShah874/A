import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';
import ProductSection from './components/ProductSection';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './styles/main.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <main>
          <ProductSection />
        </main>
        <Cart />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;