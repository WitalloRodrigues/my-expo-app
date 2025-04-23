import React, { useRef, useState } from 'react';
import { StatusBar, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import {MaterialCommunityIcons,Entypo,FontAwesome5,Fontisto,MaterialIcons} from '@expo/vector-icons';

const mockData = {
    user: {
      name: 'Jose',
    },
    currentWeek: {
      startDate: new Date(2025, 3, 21), 
      endDate: new Date(2025, 3, 27),   
    },
    appointments: [
      {
        id: 1,
        date: new Date(2025, 3, 21),
        startTime: '09:00',
        endTime: '09:30',
        clientName: 'Nome',
        service: 'CORTE',
        price: 30.0,
      },
      {
        id: 2,
        date: new Date(2025, 3, 21),
        startTime: '14:00',
        endTime: '14:30',
        clientName: 'Maria',
        service: 'CORTE',
        price: 30.0,
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
            endTime: '16:00',
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
            startTime: '15:00',
            endTime: '16:00',
            clientName: 'Ana',
            service: 'CORTE',
            price: 30.0,
        },
        {
            id: 7,
            date: new Date(2025, 3, 21),
            startTime: '15:00',
            endTime: '16:00',
            clientName: 'Ana',
            service: 'CORTE',
            price: 30.0,
        },
        {
            id: 8,
            date: new Date(2025, 3, 21),
            startTime: '09:30',
            endTime: '10:00',
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

  
const weekDays = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];


export function Main(){
    
    const [selectedDate, setSelectedDate] = useState(mockData.currentWeek.startDate);
  
  
  const formatDate = (date: Date) => {
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  
  const generateWeekDates = () => {
    const dates = [];
    const startDate = new Date(mockData.currentWeek.startDate);
    
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
  
  const parseTime = (timeStr: string): Date => {
    const [h, m] = timeStr.split(':').map(Number);
    const now = new Date();
    now.setHours(h, m, 0, 0);
    return new Date(now); // cria uma cópia pra evitar mutações
  };
  
  const todayTotal = todayAppointments.reduce((sum, app) => sum + app.price, 0);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const weekTotal = mockData.appointments.reduce((sum, app) => sum + app.price, 0);
  const screenHeight = Dimensions.get('window').height;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const handleScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(nativeEvent.contentOffset.y > screenHeight);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

    return (
    <>
        <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="mt-[26px] bg-slate-100"
      >
        
            <View className='bg-slate-900 h-[21em] rounded-e-2xl w-full relative'>
                <View className='flex flex-row justify-between items-start px-4 py-4'>
                    <View className='flex items-start'>
                        <View className='flex flex-row'>
                        <Text className='text-3xl text-orange-700'>Olá, </Text>
                        <Text className='text-2xl text-white'>{mockData.user.name}</Text>
                        </View>
                        <TouchableOpacity><Text className='text-white'>Você está em sua agenda.</Text></TouchableOpacity>
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

                <View className='flex flex-row justify-between items-center'>
                    <TouchableOpacity className=' p-4 rounded-lg flex-row  items-center gap-2'>
                            <MaterialCommunityIcons name="calendar-clock-outline" size={24} color="white" />
                            <Text className='text-xl text-white'>
                                {formatDate(mockData.currentWeek.startDate)} a {formatDate(mockData.currentWeek.endDate)}
                            </Text>
                        </TouchableOpacity>
                    <View className='flex flex-row items-center'>
                        <Entypo name="chevron-left" size={34} color="white" />
                        <Entypo name="chevron-right" size={34} color="white" />
                    </View>
                </View>

                <View className='flex flex-row justify-between items-center px-4'>
                    {weekDates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDate(date)}
                            className={`p-3 rounded-2xl flex justify-center items-center h-[4.5em] relative ${
                                selectedDate.toDateString() === date.toDateString() ? 'bg-orange-700' : 'bg-white'
                            }`}
                        >
                            <Text style={{ color: selectedDate.toDateString() === date.toDateString() ? '#fff' : '#000' }} className='text-[11px] font-bold'>
                                {weekDays[date.getDay()]}  
                            </Text>
                            <Text style={{ color: selectedDate.toDateString() === date.toDateString() ? '#fff' : '#000' }}>
                                {date.getDate()}
                            </Text>
                            <View 
                            className='w-3 h-[6px] rounded-s-full bg-slate-400 absolute -bottom-0'
                            style={{ backgroundColor: selectedDate.toDateString() === date.toDateString() ? '#fff' : 'gray' }}
                            ></View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className='flex flex-row justify-between items-center px-4 mt-2 gap-2 h-30 absolute -bottom-16'>
                    <View className='p-4 h-full w-[49%] rounded-2xl bg-orange-700'>
                        <Text className='text-xl text-white'>Hoje</Text>
                        <View className='mt-2 flex flex-row gap-2 items-center'>
                            <FontAwesome5 name="coins" size={14} color="white" />
                            <Text className='text-white font-bold'>R$ 30,00</Text>
                        </View>
                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-4xl font-bold text-white'>1</Text>
                            <MaterialCommunityIcons name="chair-rolling" size={34} color="#ffffff71" />
                        </View>
                    </View>
                    <View className='px-4 py-2 h-full w-[49%] rounded-2xl bg-white'>
                        <Text className='text-xl'>Esta semana</Text>
                        <View className='mt-2 flex flex-row gap-2 items-center'>
                            <FontAwesome5 name="coins" size={14} color="gray" />
                            <Text className='bg-gray font-bold'>R$ 60,00</Text>
                        </View>
                        <View className='flex flex-row justify-between mt-3'>
                            <Text className='text-4xl font-bold'>3</Text>
                            <MaterialCommunityIcons name="chair-rolling" size={34} color="#99989861" />
                        </View>
                    </View>
                </View>
</View>



<View className='p-6 mt-16 bg-gray-100'>
  {(() => {
    const intervalDuration = 30; // em minutos
    const startTimeStr = '08:00';
    const endTimeStr   = '19:30';

    const startTime = parseTime(startTimeStr);
    const endTime   = parseTime(endTimeStr);

    // Gera os intervalos de 30 em 30 minutos
    const intervals: Date[] = [];
    const cur = new Date(startTime);
    while (cur <= endTime) {
      intervals.push(new Date(cur));
      cur.setMinutes(cur.getMinutes() + intervalDuration);
    }

    // Só os agendamentos do dia
    const todayAppointments = mockData.appointments.filter(
      app => app.date.toDateString() === selectedDate.toDateString()
    );

    return intervals.map((time, index) => {
      const hourStr = time.toTimeString().slice(0,5);

      // linha acima de `time`: ocultar se estiver dentro de qualquer agendamento
      const suppressLine = todayAppointments.some(app => {
        const start = parseTime(app.startTime);
        const end   = parseTime(app.endTime);
        return (time > start && time < end);
      });

      // agendamentos que começam exatamente em `hourStr`
      const appsHere = todayAppointments.filter(a => a.startTime === hourStr);

      if(suppressLine){
        return null;
      }
      return (
        <View key={hourStr}>
          <View
            className={`h-[1px] ${suppressLine ? 'bg-transparent' : 'bg-slate-300'}`}
          />

          <View className='flex flex-row items-start justify-between mb-4 mt-4'>
            <Text className='text-gray-400 font-bold'>{hourStr}</Text>

            <View className='w-[80%]'>
              {appsHere.map(app => {
                const start = parseTime(app.startTime);
                const end   = parseTime(app.endTime);
                const durationH = (end.getTime() - start.getTime()) / 1000 / 60 / 60;

                return (
                  <View
                    key={app.id}
                    className='mb-4 p-4 rounded-2xl bg-white shadow-sm'
                    
                  >
                    <View className='flex flex-row justify-between items-center'>
                      <Text className='text-gray-500'>
                        {app.startTime} - {app.endTime}
                      </Text>
                      <TouchableOpacity className='flex flex-row gap-4'>
                        <Fontisto name="bell-alt" size={16} color="gray" />
                        <FontAwesome5 name="ellipsis-h" size={16} color="gray" />
                      </TouchableOpacity>
                    </View>
                    <View className='mt-3 flex flex-row justify-between items-end'>
                      <View>
                        <Text className='text-xl font-bold text-slate-900'>{app.clientName}</Text>
                        <Text className='text-gray-500'>{app.service}</Text>
                      </View>
                      <Text className='font-bold text-orange-700'>
                        R$ {app.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      );
    });
  })()}
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
                    <FontAwesome5 name="long-arrow-alt-right" size={24} color="black" />
                </TouchableOpacity>

            </View>
    </>
    )
}