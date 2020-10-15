import React, { useCallback, useState } from 'react';

import { FiClock, FiPower } from 'react-icons/fi';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import {
  Container,
  HeaderContent,
  Header,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

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
        <Content>
          <Schedule>
            <h1>Horários Agendados</h1>
            <p>
              <span>Hoje</span>
              <span>Dia 06</span>
              <span>Segunda-feira</span>
            </p>
            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/37818334?s=460&u=e20caeb3543058fc044ad564275f8777aeb512ad&v=4"
                  alt="cliente"
                />
                <strong>Leonardo Minatti</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </NextAppointment>
            <Section>
              <strong>Manhã</strong>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>
                <div>
                  <img
                    src="https://avatars0.githubusercontent.com/u/37818334?s=460&u=e20caeb3543058fc044ad564275f8777aeb512ad&v=4"
                    alt="cliente"
                  />
                  <strong>Leonardo Minatti</strong>
                </div>
              </Appointment>
              <Appointment>
                <span>
                  <FiClock />
                  09:00
                </span>
                <div>
                  <img
                    src="https://avatars0.githubusercontent.com/u/37818334?s=460&u=e20caeb3543058fc044ad564275f8777aeb512ad&v=4"
                    alt="cliente"
                  />
                  <strong>Leonardo Minatti</strong>
                </div>
              </Appointment>
            </Section>
            <Section>
              <strong>Tarde</strong>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>
                <div>
                  <img
                    src="https://avatars0.githubusercontent.com/u/37818334?s=460&u=e20caeb3543058fc044ad564275f8777aeb512ad&v=4"
                    alt="cliente"
                  />
                  <strong>Leonardo Minatti</strong>
                </div>
              </Appointment>
            </Section>
          </Schedule>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[{ daysOfWeek: [0, 6] }]}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] },
              }}
              onDayClick={handleDayChange}
              selectedDays={selectedDate}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Content>
      </Container>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
