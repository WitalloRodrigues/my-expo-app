import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { mockData } from '~/mockData';

interface Props {
  weekDates: Date[];
  weekStart: Date;
  weekEnd: Date;
  selectedDate: Date;
  onSelectDate(date: Date): void;
  onPrevWeek(): void;
  onNextWeek(): void;
}

export function WeekSelector({
  weekDates, weekStart, weekEnd, selectedDate,
  onSelectDate, onPrevWeek, onNextWeek,
}: Props) {

  return (
    <View className='mb-24 px-4 pb-4'>
      {/* Cabeçalho com range e botões */}
      <View className="flex-row justify-between ">
        <TouchableOpacity className="flex-row items-center">
          <MaterialCommunityIcons name="calendar-clock-outline" size={20} color="#fff" />
          <Text className="text-white text-lg ml-2">
            {format(weekStart, "dd MMM yyyy", { locale: ptBR })} à {format(weekEnd, "dd MMM yyyy", { locale: ptBR })}
          </Text>
        </TouchableOpacity>
        <View className="flex-row">
          <TouchableOpacity onPress={onPrevWeek}><MaterialCommunityIcons name="chevron-left" size={38} color="white" /></TouchableOpacity>
          <TouchableOpacity onPress={onNextWeek}><MaterialCommunityIcons name="chevron-right" size={38} color="white" /></TouchableOpacity>
        </View>
      </View>
      
      {/* Dias da semana */}
      <View className="flex-row justify-between mt-4">
        {weekDates.map((date,index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
                key={index}
                onPress={() => onSelectDate(date)}
                className={`p-3 rounded-2xl flex justify-center items-center h-[4.5em] relative ${
                    isSelected ? 'bg-orange-700' : date.toDateString() === new Date().toDateString() ? 'bg-gray-600' : 'bg-white'
                  }`}
            >
                <Text style={{ color: (isSelected || date.toDateString() === new Date().toDateString()) ? '#fff' : '#000' }} className='text-[11px] font-bold'>
                    {format(date, 'EEE', { locale: ptBR }).toUpperCase().slice(0, 3)}
                </Text>
                <Text style={{ color: (isSelected || date.toDateString() === new Date().toDateString()) ? '#fff' : '#000' }}>
                    {String(date.getDate()).padStart(2, '0')}
                </Text>
                <View 
                    className='w-3 h-[6px] rounded-s-full bg-slate-400 absolute -bottom-0'
                    style={{ 
                    backgroundColor: (mockData.appointments.some(app => app.date.toDateString() === date.toDateString())) ? '#49ff2f' : 'gray',
                    shadowColor: (mockData.appointments.some(app => app.date.toDateString() === date.toDateString())) ? '#49ff2f' : 'gray',
                    }}
                ></View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
