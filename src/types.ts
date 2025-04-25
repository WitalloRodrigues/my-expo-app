export interface Appointment {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  clientName: string;
  service: string;
  price: number;
  status?: 'completed' | 'pending' | string;
}

export interface User {
  name: string;
}

export interface ScheduleConfig {
  intervalDuration: number;
  startTimeStr: string;
  endTimeStr: string;
}
