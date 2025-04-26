import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
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
        <Text className="text-white text-xl">{dayLabel}</Text>
        <View className=" flex flex-row gap-2 items-center">
          <FontAwesome5 name="coins" size={15} color="white" />
            <Text className="text-white ml-1">R$ {totalMoneyToday.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            
        </View>
        <View className='flex flex-row justify-between '>
          <Text className="text-white text-3xl font-bold ">{totalToday}</Text>
          <MaterialCommunityIcons name="chair-rolling" size={34} color="#ffffff71" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="bg-white p-4 rounded-2xl w-[49%]">
        <Text className={`${weekLabel != 'Esta semana' ? 'text-base' : 'text-xl'} h-8`}>{weekLabel}</Text>
        <View className=" flex flex-row gap-2 items-center">
          <FontAwesome5 name="coins" size={15} color="gray" />
          <Text className="ml-1">R$ {totalMoneyWeek.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>
        <View className='flex flex-row justify-between '>
          <Text className='text-4xl font-bold'>{totalWeek}</Text>
          <MaterialCommunityIcons name="chair-rolling" size={34} color="#99989861" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
