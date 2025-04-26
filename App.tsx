import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import './global.css';
import AgendaScreen from '~/screen/schedule';
import MeuLinkScreen from '~/screen/meuLink'; // vamos criar já já

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Agenda">
          <Stack.Screen name="Agenda" component={AgendaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MeuLink" component={MeuLinkScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
