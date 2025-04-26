import {  ScrollView, Text, View } from 'react-native';
import { useAgenda } from './hooks/useAgenda';
import { Header } from './components/Header';
import { WeekSelector } from './components/WeekSelector';
import { StatsCards } from './components/StatsCards';
import { ScheduleLines } from './components/ScheduleLines';
import { BottomBar } from './components/BottomBar';
import { mockData } from '../../mockData';
import { ConfigScheduleDay } from './components/ConfigScheduleDay';
import {MaterialIcons} from '@expo/vector-icons';
import { ScrollToTop } from './components/ScrollToTop';
import { RightSheet } from '~/components/custom/RightSheet';
import { BottomSheet } from '~/components/custom/BottomSheet';
import { useState } from 'react';


export default function AgendaScreen() {
  const {
    selectedDate,
    setSelectedDate,
    weekDates,
    weekStart,
    weekEnd,
    stats,
    prevWeek,
    nextWeek,
    scrollToTop,
    scrollViewRef,
    handleScroll,
    showScrollTop
  } = useAgenda(mockData.appointments);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ScrollView 
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16} 
        className="bg-gray-100" 
      >
        <View className="bg-slate-900 rounded-b-3xl">
          <Header user={mockData.user} onToggleVisibility={() => {}} onToggleList={() => {}} />
          <WeekSelector
            weekDates={weekDates}
            weekStart={weekStart}
            weekEnd={weekEnd}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onPrevWeek={prevWeek}
            onNextWeek={nextWeek}
          />
          <StatsCards
            weekStart={weekStart}
            weekEnd={weekEnd}
            selectedDate={selectedDate}
            totalToday={stats.totalToday}
            totalMoneyToday={stats.totalMoneyToday}
            totalWeek={stats.totalWeek}
            totalMoneyWeek={stats.totalMoneyWeek}
            onTodayPress={() => setSelectedDate(new Date())}
            onWeekPress={prevWeek}
          />
        </View>
        <ScheduleLines
          appointments={mockData.appointments}
          selectedDate={selectedDate}
          scheduleConfig={mockData.scheduleConfig}
        />
        <ConfigScheduleDay/>
      </ScrollView>
      <BottomBar onAddPress={() => setIsOpen(true)} />
      <ScrollToTop showScrollTop={showScrollTop} scrollToTop={scrollToTop}/>

      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <Text className="text-x">Conteúdo aqui</Text>
      </BottomSheet>

      <RightSheet>
        <Text className='text-xl text-white'>Conteúdo do Menu Lateral</Text>
      </RightSheet>
    </>
  );
}
