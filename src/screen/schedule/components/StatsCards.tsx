import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { formatDate, getCurrentWeek } from '~/utils/data';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

interface StatsCardsProps {
  weekStart: Date;
  weekEnd: Date;
  selectedDate: Date;
  totalToday: number;
  totalMoneyToday: number;
  totalWeek: number;
  totalMoneyWeek: number;
  onTodayPress(): void;
  onWeekPress(): void;
}

export function StatsCards({
  weekStart, weekEnd, selectedDate, totalToday, totalMoneyToday, totalWeek, totalMoneyWeek,
  onTodayPress, onWeekPress,
}: StatsCardsProps) {

  const today = new Date();

  const dayLabel = selectedDate.toDateString() === today.toDateString() ? 'Hoje': format(selectedDate, "dd MMM", { locale: ptBR })


  const { startDate: currStart, endDate: currEnd } = getCurrentWeek();
const isCurrentWeek =
  currStart.toDateString() === weekStart.toDateString() &&
  currEnd.toDateString() === weekEnd.toDateString();
const weekLabel = isCurrentWeek
  ? 'Esta semana'
  : `${format(weekStart, "dd MMM", { locale: ptBR })} à ${format(weekEnd, "dd MMM", { locale: ptBR })} `;


  return (
    <View className="flex-row justify-between px-4 mt-6 h-30 absolute -bottom-11 gap-[5px]">
      <TouchableOpacity className="bg-orange-700 p-4 rounded-2xl w-[49%]" >
        <Text className="text-white">{dayLabel}</Text>
        <View className="flex-row items-center mt-2">
          <FontAwesome5 name="coins" size={12} color="white" />
          <Text className="text-white ml-1">R$ {totalMoneyToday.toFixed(2)}</Text>
        </View>
        <Text className="text-white text-3xl font-bold mt-2">{totalToday}</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white p-4 rounded-2xl w-[49%]">
        <Text>{weekLabel}</Text>
        <View className="flex-row items-center mt-2">
          <FontAwesome5 name="coins" size={12} color="gray" />
          <Text className="ml-1">R$ {totalMoneyWeek.toFixed(2)}</Text>
        </View>
        <Text className="text-3xl font-bold mt-2">{totalWeek}</Text>
      </TouchableOpacity>
    </View>
  );
}
