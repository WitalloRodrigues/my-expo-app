import React from 'react';
import { View, Text } from 'react-native';
import { AppointmentCard } from './AppointmentCard';
import { Appointment, ScheduleConfig } from '../../../types';
import { parseTime } from '~/utils/data';

interface ScheduleLinesProps {
  appointments: Appointment[];
  selectedDate: Date;
  scheduleConfig: ScheduleConfig;
}

export function ScheduleLines({ appointments, selectedDate, scheduleConfig }: ScheduleLinesProps) {
  const { intervalDuration, startTimeStr, endTimeStr } = scheduleConfig;
  const now = new Date();
  const isToday = selectedDate.toDateString() === now.toDateString();

  // gera intervalos regulares com base na configuração
  const startTime = parseTime(startTimeStr);
  const endTime = parseTime(endTimeStr);
  const intervals: Date[] = [];
  const cur = new Date(startTime);
  while (cur <= endTime) {
    intervals.push(new Date(cur));
    cur.setMinutes(cur.getMinutes() + intervalDuration);
  }

  // filtra agendamentos do dia selecionado e extrai horários extras
  const todayAppointments = appointments.filter(
    app => app.date.toDateString() === selectedDate.toDateString()
  );
  const extraTimes = todayAppointments.map(app => parseTime(app.startTime));

  // combina e ordena horários únicos
  const allTimes = Array.from(
    new Set([...intervals, ...extraTimes].map(d => d.getTime()))
  )
    .sort((a, b) => a - b)
    .map(t => new Date(t));

  // determina índice da linha atual
  let currentLineIndex = -1;
  if (isToday) {
    allTimes.forEach((time, i) => {
      const next = allTimes[i + 1]?.getTime() ?? Infinity;
      const nowTime = now.getTime();
      if (nowTime >= time.getTime() && nowTime < next) {
        currentLineIndex = i;
      }
    });
  }

  return (
    <View className="p-6 mt-14 bg-gray-100 relative">
      {allTimes.map((time, index) => {
        const hourStr = time.toTimeString().slice(0, 5);

        // suprime linha durante agendamento
        const inAppointment = todayAppointments.some(app => {
          const s = parseTime(app.startTime).getTime();
          const e = parseTime(app.endTime).getTime();
          return time.getTime() > s && time.getTime() < e;
        });
        if (inAppointment) return null;

        // agendamentos que começam neste horário
        const appsHere = todayAppointments.filter(
          app => parseTime(app.startTime).getTime() === time.getTime()
        );

        return (
          <View key={hourStr} className="relative">
            {/* linha atual */}
            {isToday && index === currentLineIndex && (
              <View className="absolute top-0 left-[15%] flex-row items-center w-[85%]">
                <Text>➤</Text>
                <View className="flex-1 h-[3px] bg-red-400 -ml-1" />
              </View>
            )}

            {/* linha base */}
            <View className="h-[1px] bg-slate-300" />

            <View className="flex-row items-start justify-between mb-4 mt-4">
              <Text className="text-gray-400 font-bold w-[15%]">{hourStr}</Text>
              <View className="w-[80%]">
                {appsHere.map(app => <AppointmentCard key={app.id} {...app} />)}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
