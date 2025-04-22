import React, { useState } from 'react';
import { StatusBar, SafeAreaView, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

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
        endTime: '09:40',
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
  
  
  const todayTotal = todayAppointments.reduce((sum, app) => sum + app.price, 0);
  
  
  const weekTotal = mockData.appointments.reduce((sum, app) => sum + app.price, 0);


    return (
       <View style={{ flex: 1, backgroundColor: '#fff' ,padding: 16 }} className='mt-5'>
            <SafeAreaView >
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                    Olá, {mockData.user.name}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>
                    Semana de {formatDate(mockData.currentWeek.startDate)} a {formatDate(mockData.currentWeek.endDate)}
                </Text>
                <View className='flex-row justify-between mb-4 w-full gap-2'>
                    <TouchableOpacity 
                        className='flex-1 p-4 h-30 bg-blue-50 rounded-xl flex justify-center items-center shadow-sm'
                        style={{ elevation: 2 }}
                    >
                        <Text className='text-gray-600 text-lg mb-2'>Esta semana</Text>
                        <Text className='text-blue-600 text-2xl font-bold'>
                            R$ {weekTotal.toFixed(2)}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className='flex-1 p-4 h-30 bg-blue-50 rounded-xl flex justify-center items-center shadow-sm'
                        style={{ elevation: 2 }}
                    >
                        <Text className='text-gray-600 text-lg mb-2'>Hoje</Text>
                        <Text className='text-blue-600 text-2xl font-bold'>
                            R$ {todayTotal.toFixed(2)}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {weekDates.map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDate(date)}
                            style={{
                                backgroundColor: selectedDate.toDateString() === date.toDateString() ? '#007BFF' : '#f0f0f0',
                                padding: 16,
                                borderRadius: 8,
                                marginRight: 8,
                                height: 75,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 75,
                                borderWidth: selectedDate.toDateString() === date.toDateString() ? 2 : 0,
                                borderColor: selectedDate.toDateString() === date.toDateString() ? '#0056b3' : 'transparent',

                            }}
                        >
                            <Text style={{ color: selectedDate.toDateString() === date.toDateString() ? '#fff' : '#000' }}>
                                {weekDays[date.getDay()]}  
                            </Text>
                            <Text style={{ color: selectedDate.toDateString() === date.toDateString() ? '#fff' : '#000' }}>
                                {date.getDate()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, marginTop: 16 }}>
                    {selectedDate.toDateString() === new Date().toDateString() ? 'Hoje' : 'Selecionado'}:
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 8 }}>
                    Agendamentos para {formatDate(selectedDate)}
                </Text>
                <ScrollView showsVerticalScrollIndicator={false} className='h-[270px]'>
                    {todayAppointments.length > 0 ? (
                        todayAppointments.map((app) => (
                            <View key={app.id} style={{ marginBottom: 8, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{app.clientName}</Text>
                                <Text>{app.service}</Text>
                                <Text>{app.startTime} - {app.endTime}</Text>
                                <Text>R$ {app.price.toFixed(2)}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={{ fontSize: 16, color: '#888' }}>
                            {selectedDate.toDateString() === new Date().toDateString() ? 'Hoje' : 'Neste dia'} não há agendamentos.
                        </Text>
                    )}
                </ScrollView>
                <View className='flex-row justify-between mt-4'>
                    <TouchableOpacity>
                        <View className='bg-gray-300 p-4 rounded-lg items-center'>
                            <Text style={{ color: 'white', fontSize: 16 }}>Bloquear</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View className='bg-blue-500 p-4 rounded-lg items-center'>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Adicionar Agendamento</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                
            </SafeAreaView>
        </View>
    )
}