import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Switch, Pressable, Keyboard, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaskedTextInput } from "react-native-mask-text"; // <<--- aqui
import dayjs from "dayjs";
import { DatePickerInput } from "~/components/custom/DatePickerInput";
import { TimePickerInput } from "~/components/custom/TimePickerInput";
import { PhoneInputField } from "~/components/custom/PhoneInput";
import { BottomSheet } from "~/components/custom/BottomSheet";

type FormData = {
  clientName: string;
  phone: string;
  service: string;
  date: string; // formato 'YYYY-MM-DD'
  time: string; // formato 'HH:mm'
  repeat: boolean;
};

interface Props {
  onClose(): void;
}

export function ScheduleFormContent({ onClose }: Props) {
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: { clientName: "", phone: "", service: "", date: "", time: "", repeat: false }
  });


  const [isOpen, setIsOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false); // <<--- NOVO
  const [kbHeight, setKbHeight] = useState(0);

  const selectedDate = watch('date');
  const selectedTime = watch('time');

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
    <>
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

          {/* Telefone com máscara */}
          <Controller control={control} name="phone" render={({ field }) => (
            <PhoneInputField
                value={field.value}
                onChange={field.onChange}
            />
            )} />


          {/* Serviço */}
          <TouchableOpacity onPress={() => setIsOpen(true)} className="bg-gray-100 rounded-2xl p-4 flex-row items-center justify-between">
            <Text className="text-gray">Serviços</Text>
          </TouchableOpacity>

          {/* Data */}
          <Controller control={control} name="date" render={({ field }) => (
            <DatePickerInput
                value={field.value}
                onChange={field.onChange}
                minimumDate={new Date()}
            />
           )} />


          {/* Horário com picker */}
          <Controller control={control} name="time" render={({ field }) => (
            <TimePickerInput
                value={field.value}
                onChange={field.onChange}
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
    <BottomSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      openHeight={0.7}
      zIndex={9999}
      
    >
    <View className="flex-1 bg-white rounded-t-3xl p-4">
      <View className="mt-9 flex items-center justify-center">
        <Text className="text-3xl">Lista de serviços</Text>
        <Text className="text-gray-600 text-xl">Selecione os serviços necessários</Text>
      </View>
      <View className="flex-row   mt-9">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        <View className="bg-gray-300 rounded-xl p-3 max-w-32 w-max-w-32 h-40 flex justify-between mr-2">
          <View className="self-end h-6 w-6 rounded-md bg-white mb-2" />
          <View className="flex-col justify-start gap-2">
            <Text className="font-bold text-white text-start">Corte</Text>
            <Text className="text-white text-start text-sm">R$ 30,00 40 min</Text>
          </View>
        </View>
        <View className="bg-gray-300 rounded-xl p-3 max-w-32 w-max-w-32 h-40 flex justify-between mr-2">
          <View className="self-end h-6 w-6 rounded-md bg-white mb-2" />
          <View className="flex-col justify-start gap-2">
            <Text className="font-bold text-white text-start">Corte & Sobrancelha</Text>
            <Text className="text-white text-start text-sm">R$ 50,00 50 min</Text>
          </View>
        </View>
        <View className="bg-gray-300 rounded-xl p-3 max-w-32 w-max-w-32 h-40 flex justify-between mr-2">
          <View className="self-end h-6 w-6 rounded-md bg-white mb-2" />
          <View className="flex-col justify-start gap-2">
            <Text className="font-bold text-white text-start">Corte & Barba</Text>
            <Text className="text-white text-start text-sm">R$ 50,00 50 min</Text>
          </View>
        </View>
        <View className=" border-dotted border-2 border-gray-500 rounded-xl p-3 max-w-36 w-36 h-40 flex justify-center items-center">
          <Text className="text-gray-300 text-5xl mt-2">+</Text>
        </View>
      </ScrollView>
      </View>
      <View className="mt-4 flex items-center justify-between flex-row">
        <Text className="text-gray-500 text-lg">⟶</Text>
        <Text className="text-gray-500 text-xs">ARRASTE PARA O LADO PARA VER MAIS</Text>
      </View>
      <View className="flex-row justify-around mt-6 gap-3">
        <TouchableOpacity className="bg-white rounded-2xl p-5 border border-gray-300 w-[49%]">
          <Text className="text-gray-700 font-bold text-center">VOLTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-orange-500 rounded-2xl p-5 w-[49%]">
          <Text className="text-white font-bold text-center">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </BottomSheet>
  </>
  );
}
