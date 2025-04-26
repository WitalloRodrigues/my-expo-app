import React, { useMemo, useRef, useState } from 'react';
import { StatusBar, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import {MaterialCommunityIcons,Entypo,FontAwesome5,Fontisto,MaterialIcons,AntDesign} from '@expo/vector-icons';

const mockData = {
  user: {
    name: 'Jose',
  },
  appointments: [
    {
      id: 1,
      date: new Date(2025, 3, 21),
      startTime: '09:00',
      endTime: '09:15',
      clientName: 'Nome',
      service: 'CORTE',
      price: 30.0,
      status: 'completed',
    },
    {
      id: 2,
      date: new Date(2025, 3, 21),
      startTime: '14:00',
      endTime: '14:30',
      clientName: 'Maria',
      service: 'CORTE',
      price: 37.19,
      status: 'completed',
    },
    {
      id: 3,
      date: new Date(2025, 3, 26),
      startTime: '10:00',
      endTime: '11:00',
      clientName: 'Carlos',
      service: 'BARBA',
      price: 30.0,
    },
    {
      id: 4,
      date: new Date(2025, 3, 26),
      startTime: '15:00',
      endTime: '15:30',
      clientName: 'Ana',
      service: 'CORTE',
      price: 30.0,
    },
    {
      id: 5,
      date: new Date(2025, 3, 21),
      startTime: '10:00',
      endTime: '11:00',
      clientName: 'Lucas',
      service: 'BARBA',
      price: 30.0,
    },
    {
      id: 6,
      date: new Date(2025, 3, 21),
      startTime: '15:30',
      endTime: '16:00',
      clientName: 'Ana',
      service: 'CORTE',
      price: 30.0,
    },
    {
      id: 7,
      date: new Date(2025, 3, 21),
      startTime: '15:00',
      endTime: '15:30',
      clientName: 'Ana',
      service: 'CORTE',
      price: 30.0,
    },
    {
      id: 8,
      date: new Date(2025, 3, 21),
      startTime: '09:18',
      endTime: '09:48',
      clientName: 'Nome',
      service: 'CORTE Zero',
      price: 40.0,
    },
    {
      id: 9,
      date: new Date(2025, 3, 21),
      startTime: '17:00',
      endTime: '19:00',
      clientName: 'Nome',
      service: 'CORTE Zero',
      price: 40.0,
    },
  ],
};

const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const getCurrentWeek = () => {
const today = new Date();
const dayOfWeek = today.getDay();
const startDate = new Date(today);
startDate.setDate(today.getDate() - dayOfWeek);
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 6);
return { startDate, endDate };
};

const currentWeek = getCurrentWeek();

export function Main() {
const [selectedDate, setSelectedDate] = useState(new Date());
const [weekStart, setWeekStart] = useState(currentWeek.startDate);
const [weekEnd, setWeekEnd] = useState(currentWeek.endDate);

const formatDate = (date: Date) => {
  const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const generateWeekDates = () => {
  const dates = [];
  const startDate = new Date(weekStart);
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    dates.push(currentDate);
  }
  return dates;
};

const weekDates = generateWeekDates();

const todayAppointments = mockData.appointments.filter(
  app => app.date.toDateString() === selectedDate.toDateString()
);

const todayTotal = todayAppointments.reduce((sum, app) => sum + app.price, 0);
const weekTotal = mockData.appointments.reduce((sum, app) => sum + app.price, 0);

const scrollViewRef = useRef<ScrollView>(null);
const screenHeight = Dimensions.get('window').height;
const [showScrollTop, setShowScrollTop] = useState(false);

const handleScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
  setShowScrollTop(nativeEvent.contentOffset.y > screenHeight);
};

const scrollToTop = () => {
  scrollViewRef.current?.scrollTo({ y: 0, animated: true });
};

const parseTime = (timeStr: string): Date => {
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  now.setHours(h, m, 0, 0);
  return new Date(now); // cria uma cópia pra evitar mutações
};

const cardData = useMemo(() => {
  const todayCompleted = mockData.appointments.filter((item) => {
    return item.date.toDateString() === selectedDate.toDateString() 
      && item.status === 'completed';
  });

  const weekCompleted = mockData.appointments.filter((item) => {
    const scheduledDate = item.date;
    return scheduledDate >= new Date(weekStart) 
      && scheduledDate <= new Date(weekEnd)
      && item.status === 'completed';
  });

  return {
    totalToday: todayCompleted.length,
    totalMoneyToday: `R$ ${todayCompleted.reduce((sum, app) => sum + app.price, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
    totalWeek: weekCompleted.length,
    totalMoneyWeek: `R$ ${weekCompleted.reduce((sum, app) => sum + app.price, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  };
}, [selectedDate, weekStart, weekEnd, mockData.appointments]);



    return (
    <>
        <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="mt-[26px] bg-slate-100"
      >
        
            <View className='bg-slate-900 min-h-[21em] rounded-e-2xl w-full relative'>

                <View className='flex flex-row justify-between items-start px-4 py-4'>
                    <View className='flex items-start'>
                        <View className='flex flex-row'>
                        <Text className='text-3xl text-orange-700'>Olá, </Text>
                        <Text className='text-2xl text-white'>{mockData.user.name}</Text>
                        </View>
                        <TouchableOpacity className='flex flex-row items-center'>
                            <Text className='text-white'>Você está em sua agenda.</Text>
                            <AntDesign name="caretdown" size={10} color="white" />
                            </TouchableOpacity>
                    </View>
                    <View className='flex items-center flex-row gap-2'>
                        <TouchableOpacity className='bg-orange-700 p-2 rounded-lg'>
                            <Text><MaterialCommunityIcons name="eye-off" size={24} color="white" /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-orange-700 p-2 rounded-lg'>
                            <Text><Entypo name="list" size={24} color="white" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='flex flex-row justify-between items-center px-5 gap-3 mb-5'>
                        <TouchableOpacity className=' rounded-lg flex-row  items-center gap-2 min-w-[18.5em]'>
                            <MaterialCommunityIcons name="calendar-clock-outline" size={24} color="white" />
                            <Text className='text-xl text-white'>
                                {formatDate(currentWeek.startDate)} a {formatDate(currentWeek.endDate)}
                            </Text>
                        </TouchableOpacity>

                        <View className='flex flex-row items-center'>
                        <TouchableOpacity 
                        onPress={() => {
                          const newDate = new Date(weekStart);
                          newDate.setDate(newDate.getDate() - 7);
                          setWeekStart(newDate);
                          const newEndDate = new Date(newDate);
                          newEndDate.setDate(newDate.getDate() + 6);
                          setWeekEnd(newEndDate);
                        }}
                        >
                        <MaterialCommunityIcons name="chevron-left" size={34} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={() => {
                          const newDate = new Date(weekStart);
                          newDate.setDate(newDate.getDate() + 7);
                          setWeekStart(newDate);
                          const newEndDate = new Date(newDate);
                          newEndDate.setDate(newDate.getDate() + 6);
                          setWeekEnd(newEndDate);
                        }}
                        >
                        <MaterialCommunityIcons name="chevron-right" size={34} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='flex flex-row justify-between items-center px-4 mb-[6em]'>
                    {weekDates.map((date, index) => {
                      const isToday = new Date().toDateString() === date.toDateString();
                      const isSelected = selectedDate.toDateString() === date.toDateString();
                      
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => setSelectedDate(date)}
                          className={`p-3 rounded-2xl flex justify-center items-center h-[4.5em] relative ${
                            isSelected ? 'bg-orange-700' : isToday ? 'bg-gray-600' : 'bg-white'
                          }`}
                        >
                          <Text style={{ color: (isSelected || isToday) ? '#fff' : '#000' }} className='text-[11px] font-bold'>
                            {weekDays[date.getDay()]}  
                          </Text>
                          <Text style={{ color: (isSelected || isToday) ? '#fff' : '#000' }}>
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

                <View className='flex flex-row justify-between items-center px-4 mt-2 gap-2 h-30 absolute -bottom-16'>
                    <View className='p-4 h-full w-[49%] rounded-2xl bg-orange-700'>
                        <TouchableOpacity onPress={() => {
                          const today = new Date();
                          setSelectedDate(today);
                          const newStart = new Date(today);
                          newStart.setDate(today.getDate() - today.getDay());
                          setWeekStart(newStart);
                          const newEnd = new Date(newStart);
                          newEnd.setDate(newStart.getDate() + 6);
                          setWeekEnd(newEnd);
                        }}>
                          <Text className='text-xl text-white'>Hoje</Text>
                          <View className='mt-2 flex flex-row gap-2 items-center'>
                            <FontAwesome5 name="coins" size={14} color="white" />
                            <Text className='text-white font-bold'>{cardData.totalMoneyToday}</Text>
                          </View>
                          <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-4xl font-bold text-white'>{cardData.totalToday}</Text>
                            <MaterialCommunityIcons name="chair-rolling" size={34} color="#ffffff71" />
                          </View>
                        </TouchableOpacity>
                    </View>
                    <View className='px-4 py-2 h-full w-[49%] rounded-2xl bg-white'>
                      <TouchableOpacity onPress={() => {
                            const today = new Date();
                            const newStart = new Date(today);
                            newStart.setDate(today.getDate() - today.getDay());
                            setWeekStart(newStart);
                            const newEnd = new Date(newStart);
                            newEnd.setDate(newStart.getDate() + 6);
                            setWeekEnd(newEnd);
                          }}>
                          <Text className='text-xl'>Esta semana</Text>
                          <View className='mt-2 flex flex-row gap-2 items-center'>
                              <FontAwesome5 name="coins" size={14} color="gray" />
                              <Text className='bg-gray font-bold'>{cardData.totalMoneyWeek}</Text>
                          </View>
                          <View className='flex flex-row justify-between mt-3'>
                              <Text className='text-4xl font-bold'>{cardData.totalWeek}</Text>
                              <MaterialCommunityIcons name="chair-rolling" size={34} color="#99989861" />
                          </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View className="p-6 mt-16 bg-gray-100 relative">
              {(() => {
                const intervalDuration = 30;
                const startTimeStr = "08:00";
                const endTimeStr = "19:30";
                const startTime = parseTime(startTimeStr);
                const endTime = parseTime(endTimeStr);

                const now = new Date();
                const isToday =
                  selectedDate.toDateString() === now.toDateString();

                const intervals: Date[] = [];
                const cur = new Date(startTime);
                while (cur <= endTime) {
                  intervals.push(new Date(cur));
                  cur.setMinutes(cur.getMinutes() + intervalDuration);
                }

                const todayAppointments = mockData.appointments.filter(
                  app => app.date.toDateString() === selectedDate.toDateString()
                );

                const extraTimes = todayAppointments.map(app => parseTime(app.startTime));
                const allTimes = [...intervals, ...extraTimes]
                  .map(d => d.getTime()) 
                  .filter((v, i, a) => a.indexOf(v) === i)
                  .sort((a, b) => a - b)
                  .map(t => new Date(t));

                const renderLine = (hourStr: string) => {
                  return (
                    <View key={`${hourStr}-line`}>
                      <View className="h-[1px] bg-slate-300" />
                    </View>
                  );
                };

                // acha o índice do horário mais próximo ao agora
                let currentLineIndex = -1;
                if (isToday) {
                  const nowTime = now.getTime();
                  for (let i = 0; i < allTimes.length - 1; i++) {
                    if (nowTime >= allTimes[i].getTime() && nowTime < allTimes[i + 1].getTime()) {
                      currentLineIndex = i;
                      break;
                    }
                  }
                }

                return (
                  <>
                    {allTimes.map((time, index) => {
                      const hourStr = time.toTimeString().slice(0, 5);
                      const suppressLine = todayAppointments.some(app => {
                        const s = parseTime(app.startTime);
                        const e = parseTime(app.endTime);
                        return time > s && time < e;
                      });
                      const appsHere = todayAppointments.filter(
                        app => parseTime(app.startTime).getTime() === time.getTime()
                      );

                      if (suppressLine) return null;

                      return (
                        <View key={hourStr} className="relative">
                          {/* Linha atual vermelha */}
                                  {isToday && index === currentLineIndex && (
                                  <View className="absolute top-0 left-[15%] flex flex-row items-center w-[85%]">
                                    <AntDesign name="caretright" size={18} color="red" />
                                    <View className="flex-1 h-[3px] bg-red-400 -ml-1" />
                                  </View>
                                  )}

                                  {/* Linha padrão */}
                          <View className="h-[1px] bg-slate-300" />

                          <View className="flex flex-row items-start justify-between mb-4 mt-4">
                            <Text className="text-gray-400 font-bold">{hourStr}</Text>
                            <View className="w-[80%]">
                              {appsHere.map(app => (
                                <View key={app.id} className="mb-4 p-4 rounded-2xl bg-white shadow-sm">
                                  <View className="flex flex-row justify-between items-center">
                                    <Text className="text-gray-500">
                                      {app.startTime} - {app.endTime}
                                    </Text>
                                    <TouchableOpacity className="flex flex-row gap-9">
                                      <Fontisto name="bell-alt" size={16} color="gray" />
                                      <FontAwesome5 name="ellipsis-h" size={16} color="gray" />
                                    </TouchableOpacity>
                                  </View>
                                  <View className="mt-3 flex flex-row justify-between items-end">
                                    <View>
                                      <Text className="text-xl font-bold text-slate-900">{app.clientName}</Text>
                                      <Text className="text-gray-500">{app.service}</Text>
                                    </View>
                                    <Text className="font-bold text-orange-700">
                                      R$ {app.price.toFixed(2)}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </>
                );
              })()}
            </View>

            <View className="p-6 mt-8 bg-gray-100 flex items-center justify-center">
              <TouchableOpacity className='flex justify-center items-center bg-slate-900 rounded-xl px-6'>
                <Text className='uppercase p-3 text-white'>
                  Modificar apenas este dia
                </Text>
              </TouchableOpacity>
              <View className='flex justify-center items-center'>
                <Text className='text-sm mt-8'>
                  Seu hórario de funcionamento cadastrado
                </Text>
                <Text className='text-sm'>
                  é das {' '}
                  <Text className='font-bold text-orange-700 text-sm'>
                    09:00hrs às 18:00hrs.
                  </Text>
                </Text>
              </View>
              
              <TouchableOpacity className='mt-4'>
                <Text className='underline text-orange-700'>
                  Editar horários
                </Text>
              </TouchableOpacity>
              <View>
                <Text className='text-xs mt-10'>
                AgendaAE {' '}
                    <Text className='font-bold text-slate-800'>
                    Versão 1.0.0 
                    </Text>
                </Text>
              </View>   
            </View>

        </ScrollView>

        {showScrollTop && (
        <TouchableOpacity
          onPress={scrollToTop}
          className="absolute bottom-24 right-6 p-3 bg-orange-700 rounded-2xl shadow-lg"
        >
          <MaterialIcons name="keyboard-arrow-up" size={28} color="white" />
        </TouchableOpacity>
      )}

        <View className='fixed bottom-0 flex flex-row p-4 gap-2 justify-betwee bg-gray-100'>
                <TouchableOpacity className='p-4 bg-slate-900 rounded-2xl flex items-center'>
                    <MaterialIcons name="lock-clock" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity className='p-4 rounded-lg items-center w-[81%] mr-2 bg-orange-700 flex flex-row justify-between'>
                    <Text className='text-white'>Adicionar Agendamento</Text>
                    <FontAwesome5 name="long-arrow-alt-up" size={24} color="white" />
                </TouchableOpacity>

            </View>
    </>
    )
}