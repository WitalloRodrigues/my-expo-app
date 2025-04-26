import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Switch, Pressable, Keyboard, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from "dayjs";

type FormData = {
  clientName: string;
  phone: string;
  service: string;
  date: string; 
  time: string;
  repeat: boolean;
};

interface Props {
  onClose(): void;
}

export function ScheduleFormContent({ onClose }: Props) {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: { clientName: "", phone: "", service: "", date: "", time: "", repeat: false }
  });

  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [kbHeight, setKbHeight] = useState(0);

  const selectedDate = watch('date');

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", e => setKbHeight(e.endCoordinates.height));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKbHeight(0));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
    onClose();
  };

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-white rounded-t-3xl"
      contentContainerStyle={{ paddingBottom: kbHeight - 300, paddingTop: 0 }}
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={24}
    >
      <View className="p-4">
        <Pressable
          onPress={onClose}
          className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center mb-4"
        >
          <Text className="text-xl">←</Text>
        </Pressable>

        <Text className="text-2xl font-bold text-center mb-6 mt-24">Novo agendamento</Text>

        <View className="gap-4">

          {/* Nome do Cliente */}
          <Controller control={control} name="clientName" render={({ field }) => (
            <TextInput
              className="bg-gray-100 rounded-2xl p-4 text-base"
              placeholder="Nome do cliente"
              onChangeText={field.onChange}
              value={field.value}
            />
          )} />

          {/* Telefone */}
          <Controller control={control} name="phone" render={({ field }) => (
            <TextInput
              className="bg-gray-100 rounded-2xl p-4 text-base"
              placeholder="Telefone"
              keyboardType="phone-pad"
              onChangeText={field.onChange}
              value={field.value}
            />
          )} />

          {/* Serviço */}
          <Controller control={control} name="service" render={({ field }) => (
            <TextInput
              className="bg-gray-100 rounded-2xl p-4 text-base"
              placeholder="Serviço"
              onChangeText={field.onChange}
              value={field.value}
            />
          )} />

          {/* Data */}
          <View>
            <Pressable
              onPress={() => setDateModalOpen(true)}
              className="bg-gray-100 rounded-2xl p-4"
            >
              <Text className="text-base text-gray-700">
                {selectedDate ? dayjs(selectedDate).format('DD/MM/YYYY') : 'Selecionar data'}
              </Text>
            </Pressable>

            {dateModalOpen && (
              <DateTimePicker
                value={selectedDate ? dayjs(selectedDate).toDate() : new Date()}
                mode="date"
                display="default"
                minimumDate={new Date()} // This sets the minimum date to today
                onChange={(event, date) => {
                  setDateModalOpen(false);
                  if (event.type === "set" && date) {
                    setValue('date', dayjs(date).format('YYYY-MM-DD'));
                  }
                }}
              />
            )}
          </View>

          {/* Horário */}
          <Controller control={control} name="time" render={({ field }) => (
            <TextInput
              className="bg-gray-100 rounded-2xl p-4 text-base"
              placeholder="Horário (ex: 14:30)"
              onChangeText={field.onChange}
              value={field.value}
            />
          )} />

          {/* Repetir */}
          <View className="flex-row items-center justify-between bg-gray-100 rounded-2xl py-2 px-4">
            <Text className="text-base">Repetir agendamento</Text>
            <Controller control={control} name="repeat" render={({ field }) => (
              <Switch value={field.value} onValueChange={field.onChange} />
            )} />
          </View>
        </View>

        {/* Botão de Agendar */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-orange-500 rounded-2xl p-4 items-center mt-8 shadow-md shadow-orange-300 mb-8"
        >
          <Text className="text-white text-lg font-bold">AGENDAR</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}
