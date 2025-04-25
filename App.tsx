
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Profile } from '~/App/Profile';
import { Main } from '~/App/Main';
import AgendaScreen from '~/screen/schedule';


export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AgendaScreen />
    </>
  );
}
