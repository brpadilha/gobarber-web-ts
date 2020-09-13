import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import AppProvider from './hooks';

import ToastContainer from './components/ToastContainer';

// import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
    </AppProvider>

    <ToastContainer />
    <GlobalStyle />
    {/* <SignUp /> */}
  </>
);

export default App;
