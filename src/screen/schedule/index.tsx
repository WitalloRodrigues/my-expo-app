import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { useAgenda } from './hooks/useAgenda';
import { Header } from './components/Header';
import { WeekSelector } from './components/WeekSelector';
import { StatsCards } from './components/StatsCards';
import { ScheduleLines } from './components/ScheduleLines';
import { BottomBar } from './components/BottomBar';
import { mockData } from '../../mockData';
import { ConfigScheduleDay } from './components/ConfigScheduleDay';
import { ScrollToTop } from './components/ScrollToTop';
import { RightSheet } from '~/components/custom/RightSheet';
import { BottomSheet } from '~/components/custom/BottomSheet';
import { BackHandler } from 'react-native';
import AppMenu from '../menu';
import { useNavigation, ParamListBase, NavigationProp } from '@react-navigation/native';
import { ScheduleFormContent } from './components/ScheduleFormContent';

export default function AgendaScreen() {
  const Navigation = useNavigation<NavigationProp<ParamListBase>>();

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
    showScrollTop,
  } = useAgenda(mockData.appointments);

  const navigation = useNavigation();
  const isNavigationReady = !!navigation;

  const [isOpen, setIsOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // Estado para controlar o refresh

  // Função para lidar com o pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Simule ou implemente a lógica de recarga de dados aqui
      console.log('Refreshing data...');
      // Add a delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      // Exemplo: await fetchData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (isOpen) {
        setIsOpen(false);
        return true; // Impede que o app feche
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isOpen]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="bg-gray-100"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#EF4444']} // Cor do indicador Android
            tintColor="#EF4444" // Cor do indicador iOS
          />
        }
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
          refreshing={refreshing}
        />
        <ConfigScheduleDay />
      </ScrollView>

      <BottomBar onAddPress={() => setIsOpen(true)} /> 
      <ScrollToTop showScrollTop={showScrollTop} scrollToTop={scrollToTop} />

      <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <ScheduleFormContent onClose={() => setIsOpen(false)} />
      </BottomSheet>

      <RightSheet>
        {isNavigationReady ? (
          <AppMenu navigation={navigation} />
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">Carregando menu...</Text>
          </View>
        )}
      </RightSheet>
    </>
  );
}