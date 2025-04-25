import { Appointment, User, ScheduleConfig } from './types';

export const mockData: { user: User; appointments: Appointment[]; scheduleConfig: ScheduleConfig } = {
  user: { name: 'Jose' },
  appointments: [
    { id: 1, date: new Date(2025, 3, 21), startTime: '09:00', endTime: '10:10', clientName: 'Nome', service: 'CORTE', price: 30.0, status: 'completed' },
    { id: 2, date: new Date(2025, 3, 21), startTime: '10:11', endTime: '17:30', clientName: 'Maria', service: 'CORTE', price: 37.19, status: 'completed' },
    { id: 3, date: new Date(2025, 3, 21), startTime: '19:11', endTime: '19:12', clientName: 'Maria', service: 'CORTE', price: 37.19, status: 'completed' },
    // ... demais itens
  ],
  scheduleConfig: {
    intervalDuration: 30,
    startTimeStr: '08:00',
    endTimeStr: '19:30',
  }
};