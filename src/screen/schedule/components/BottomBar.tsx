import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface BottomBarProps { onAddPress(): void; }
export function BottomBar({ onAddPress }: BottomBarProps) {
  return (
    <View className="flex-row p-4 bg-gray-100 justify-between fixed bottom-0 w-full gap-2">
      <TouchableOpacity className="p-4 bg-slate-900 rounded-2xl items-center"><MaterialIcons name="lock-clock" size={24} color="white"/></TouchableOpacity>
      <TouchableOpacity onPress={onAddPress} className="p-4 w-[81%] mr-2 rounded-2xl bg-orange-700 flex-row items-center justify-between"><Text className="text-white mr-2">Adicionar Agendamento</Text><FontAwesome5 name="long-arrow-alt-up" size={20} color="white"/></TouchableOpacity>
    </View>
  );
}