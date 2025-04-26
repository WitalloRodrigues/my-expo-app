import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import './global.css';
import { Profile } from '~/App/Profile';
import { Main } from '~/App/Main';
import AgendaScreen from '~/screen/schedule';
import Home from '~/screen/home';


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor='transparent' translucent/>
      {/* <Home /> */}
      <AgendaScreen />
    </GestureHandlerRootView>
  );
}
