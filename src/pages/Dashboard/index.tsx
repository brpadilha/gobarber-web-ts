import React, { useCallback } from 'react';

import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleSubmit = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <>
      <h1>Dashboard</h1>
      <Form onSubmit={handleSubmit}>
        <button type="submit">LogOut</button>
      </Form>
    </>
  );
};

export default Dashboard;
