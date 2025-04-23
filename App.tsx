
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Profile } from '~/App/Profile';
import { Main } from '~/App/Main';


export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Main/>
    </>
  );
}
