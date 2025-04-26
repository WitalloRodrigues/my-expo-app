import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useCallback } from 'react';

const allowedScreens = [
  'MeuLink',
  'Clientes',
  'Cancelados',
  'MinhasRecorrencias',
  'Faturamento'
];

export function useHandleBackButton() {
  const navigation = useNavigation();
  const route = useRoute();

  useFocusEffect(
    useCallback(() => {
      if (!allowedScreens.includes(route.name)) {
        return;
      }

      const onBackPress = () => {
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation, route.name])
  );
}
