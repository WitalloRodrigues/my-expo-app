import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";

interface DatePickerInputProps {
  value: string; // deve vir no formato 'YYYY-MM-DD'
  onChange: (date: string) => void;
  label?: string;
  minimumDate?: Date;
}

export function DatePickerInput({ value, onChange, label, minimumDate }: DatePickerInputProps) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      {label && <Text className="mb-1 text-base">{label}</Text>}
      <Pressable
        onPress={() => setOpen(true)}
        className="bg-gray-100 rounded-2xl p-4"
      >
        <Text className="text-base text-gray-700">
          {value ? dayjs(value).format('DD/MM/YYYY') : 'Selecionar data'}
        </Text>
      </Pressable>

      {open && (
        <DateTimePicker
          value={value ? dayjs(value).toDate() : new Date()}
          mode="date"
          display="default"
          minimumDate={minimumDate}
          onChange={(event, date) => {
            setOpen(false);
            if (event.type === "set" && date) {
              onChange(dayjs(date).format('YYYY-MM-DD'));
            }
          }}
        />
      )}
    </View>
  );
}
