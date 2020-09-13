import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

// Arquivo que vai estar todos os contexts hooks
// Serve para não poluir o App

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
