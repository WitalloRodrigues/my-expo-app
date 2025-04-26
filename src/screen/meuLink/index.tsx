import { View, Text } from 'react-native';
import { useHandleBackButton } from '~/hooks/useHandleBackButton';

export default function MeuLinkScreen() {

    useHandleBackButton();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Essa é a tela do Meu Link!</Text>
    </View>
  );
}
