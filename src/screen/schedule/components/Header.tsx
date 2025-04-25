import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { User } from '../../../types';

interface HeaderProps {
  user: User;
  onToggleVisibility(): void;
  onToggleList(): void;
}

export function Header({ user, onToggleVisibility, onToggleList }: HeaderProps) {
  return (
    <View className="flex-row justify-between items-start  p-4 mt-8">
      <View>
        <View className="flex-row">
          <Text className="text-3xl text-orange-700">Olá, </Text>
          <Text className="text-2xl text-white">{user.name}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-white">Você está em sua agenda.</Text>
          <AntDesign name="caretdown" size={10} color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-2">
        <TouchableOpacity className="bg-orange-700 p-3 rounded-lg" onPress={onToggleVisibility}>
          <MaterialCommunityIcons name="eye-off" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-orange-700 p-3 rounded-lg" onPress={onToggleList}>
          <Entypo name="list" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
