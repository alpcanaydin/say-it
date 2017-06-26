import React from 'react';

import Logo from './components/Logo';
import Splash from './components/Splash';
import Footer from './components/Footer';

const App = () =>
  <div className="container">
    <div className="aligner">
      <div className="aligner-item aligner-item-top">
        <Logo />
      </div>
      <div className="aligner-item text-center">
        <Splash />
      </div>
      <div className="aligner-item aligner-item-bottom">
        <Footer />
      </div>
    </div>
  </div>;

export default App;
