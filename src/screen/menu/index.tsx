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
    <View className="flex-1 flex flex-col justify-between h-screen  px-4">
        {/* Header Section */}
        <View className="h-20 bg-orange-700 justify-center items-center border-b border-orange-700  rounded-2xl">
            <Image 
                source={require('../../../assets/logo.png')}
                className="w-[150px] h-[50px]"
                resizeMode="contain"
            />
        </View>
        
        <View className="flex-grow mt-64">
            <TouchableOpacity 
                className="bg-orange-700 p-4 rounded-lg mb-4 shadow-sm"
                onPress={() => safeNavigate('MeuLink')}
            >
                <Text className="text-white font-medium text-base text-center">Meu Link</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                className="bg-orange-700 p-4 rounded-lg mb-4 shadow-sm"
                onPress={() => safeNavigate('Clientes')}
            >
                <Text className="text-white font-medium text-base text-center">Clientes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                className="bg-orange-700 p-4 rounded-lg mb-4 shadow-sm"
                onPress={() => safeNavigate('Cancelados')}
            >
                <Text className="text-white font-medium text-base text-center">Cancelados</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                className="bg-orange-700 p-4 rounded-lg mb-4 shadow-sm"
                onPress={() => safeNavigate('MinhasRecorrencias')}
            >
                <Text className="text-white font-medium text-base text-center">Minhas Recorrências</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                className="bg-orange-700 p-4 rounded-lg mb-4 shadow-sm"
                onPress={() => safeNavigate('Faturamento')}
            >
                <Text className="text-white font-medium text-base text-center">Faturamento</Text>
            </TouchableOpacity>
        </View>
        
        {/* Footer Section */}
        <View className="h-10 items-center justify-center">
            <Text className="text-gray-500 text-sm uppercase">© 2025 luquinhas jn</Text>
        </View>
    </View>
);
};

export default AppMenu;