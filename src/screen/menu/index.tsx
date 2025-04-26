import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { ParamListBase } from '@react-navigation/native';

interface AppMenuProps {
  navigation: any; // Usando any para evitar problemas de tipagem
}

const AppMenu: React.FC<AppMenuProps> = ({ navigation }) => {
  // Função para navegar com segurança
  const safeNavigate = (screenName: string) => {
    if (navigation && navigation.navigate) {
      navigation.navigate(screenName);
    } else {
      // Fallback se a navegação não estiver disponível
      Alert.alert('Navegação não disponível', 'Não foi possível navegar para ' + screenName);
    }
  };

  return (
    <View className="flex-1">
      {/* Header com logo */}
      <View className="h-20 bg-orange-700 justify-center items-center border-b border-orange-700 pt-2 rounded-2xl">
        <Image 
          source={require('../../../assets/logo.png')} // Ajuste o caminho da imagem conforme necessário
          className="w-[150px] h-[50px]"
          resizeMode="contain"
        />
      </View>
      
      {/* Menu items */}
      <View className="flex-1 mt-24">
        <TouchableOpacity 
          className="bg-white p-4 rounded-lg mb-4 shadow-sm"
          onPress={() => safeNavigate('MeuLink')}
        >
          <Text className="text-base font-medium text-gray-800 text-center">Meu Link</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white p-4 rounded-lg mb-4 shadow-sm"
          onPress={() => safeNavigate('Clientes')}
        >
          <Text className="text-base font-medium text-gray-800 text-center">Clientes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white p-4 rounded-lg mb-4 shadow-sm"
          onPress={() => safeNavigate('Cancelados')}
        >
          <Text className="text-base font-medium text-gray-800 text-center">Cancelados</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white p-4 rounded-lg mb-4 shadow-sm"
          onPress={() => safeNavigate('MinhasRecorrencias')}
        >
          <Text className="text-base font-medium text-gray-800 text-center">Minhas Recorrências</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-white p-4 rounded-lg mb-4 shadow-sm"
          onPress={() => safeNavigate('Faturamento')}
        >
          <Text className="text-base font-medium text-gray-800 text-center">Faturamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppMenu;