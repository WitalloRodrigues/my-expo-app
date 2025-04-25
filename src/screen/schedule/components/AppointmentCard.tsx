import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { Appointment } from '../../../types';

export function AppointmentCard({ id, startTime, endTime, clientName, service, price }: Appointment) {
  return (
    <View className="mb-4 p-4 rounded-2xl bg-white shadow-sm">
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-500">{startTime} - {endTime}</Text>
        <View className="flex-row gap-4">
          <TouchableOpacity><Fontisto name="bell-alt" size={16} color="gray" /></TouchableOpacity>
          <TouchableOpacity><FontAwesome5 name="ellipsis-h" size={16} color="gray" /></TouchableOpacity>
        </View>
      </View>
      <View className="mt-3 flex-row justify-between items-end">
        <View>
          <Text className="text-xl font-bold text-slate-900">{clientName}</Text>
          <Text className="text-gray-500">{service}</Text>
        </View>
        <Text className="font-bold text-orange-700">R$ {price.toFixed(2)}</Text>
      </View>
    </View>
  );
}