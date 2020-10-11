import React from 'react';

import { FiPower } from 'react-icons/fi';
import { Container, HeaderContent, Header, Profile } from './styles';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <img src={logo} alt="GoBarber" />
            <Profile>
              <img
                src="https://avatars0.githubusercontent.com/u/37818334?s=460&u=e20caeb3543058fc044ad564275f8777aeb512ad&v=4"
                alt="profile"
              />
              <div>
                <span>Bem vindo,</span>
                <strong>{user.name}</strong>
              </div>
            </Profile>

            <button type="button" onClick={signOut}>
              <FiPower size={20} />
            </button>
          </HeaderContent>
        </Header>
      </Container>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
