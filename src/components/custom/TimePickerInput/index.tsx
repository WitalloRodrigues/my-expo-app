import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";

interface TimePickerInputProps {
  value: string; // deve vir no formato 'HH:mm'
  onChange: (time: string) => void;
  label?: string;
}

export function TimePickerInput({ value, onChange, label }: TimePickerInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {label && <Text className="mb-1 text-base">{label}</Text>}
      <Pressable
        onPress={() => setOpen(true)}
        className="bg-gray-100 rounded-2xl p-4"
      >
        <Text className="text-base text-gray-700">
          {value ? value : 'Selecionar horário'}
        </Text>
      </Pressable>

      {open && (
        <DateTimePicker
          value={value ? dayjs().hour(Number(value.split(":")[0])).minute(Number(value.split(":")[1])).toDate() : new Date()}
          mode="time"
          display="default"
          is24Hour
          onChange={(event, date) => {
            setOpen(false);
            if (event.type === "set" && date) {
              onChange(dayjs(date).format('HH:mm'));
            }
          }}
        />
      )}
    </View>
  );
}
