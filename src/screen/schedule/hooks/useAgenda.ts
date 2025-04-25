import { addDays } from 'date-fns';
import { useState, useMemo, useRef } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { Appointment } from '~/types';
import { getCurrentWeek } from '~/utils/data';
export function useAgenda(appointments: Appointment[]) {
  const { startDate, endDate } = getCurrentWeek();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startDate);
  const [weekEnd, setWeekEnd] = useState(endDate);

  const weekDates = useMemo(
    () => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const stats = useMemo(() => {
    const todayApps = appointments.filter(
      a => a.date.toDateString() === selectedDate.toDateString() && a.status === 'completed'
    );
    const weekApps = appointments.filter(
      a => a.date >= weekStart && a.date <= weekEnd && a.status === 'completed'
    );
    return {
      totalToday: todayApps.length,
      totalMoneyToday: todayApps.reduce((sum, a) => sum + a.price, 0),
      totalWeek: weekApps.length,
      totalMoneyWeek: weekApps.reduce((sum, a) => sum + a.price, 0),
    };
  }, [appointments, selectedDate, weekStart, weekEnd]);

  const prevWeek = () => {
    setWeekStart(d => addDays(d, -7));
    setWeekEnd(d => addDays(d, -7));
  };
  const nextWeek = () => {
    setWeekStart(d => addDays(d, 7));
    setWeekEnd(d => addDays(d, 7));
  };

  const scrollViewRef = useRef<ScrollView>(null);
  const screenHeight = Dimensions.get('window').height;
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const handleScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollTop(nativeEvent.contentOffset.y > screenHeight);
  };
  
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return {
    selectedDate,
    setSelectedDate,
    weekDates,
    weekStart,
    weekEnd,
    stats,
    prevWeek,
    nextWeek,
    handleScroll,
    scrollToTop,
    showScrollTop,
    scrollViewRef
  };
}
