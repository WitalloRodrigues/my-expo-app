import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Keyboard,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type FormData = {
  clientName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  repeat: boolean;
};

export function ScheduleFormContent() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      clientName: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      repeat: false,
    },
  });

  const [kbHeight, setKbHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKbHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKbHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // aqui você pode chamar sua API ou fechar o sheet
  };

  return (
    <KeyboardAwareScrollView
    className='bg-red-200 h-[200em] rounded-t-3xl'
      contentContainerStyle={{ padding: 16, gap: 16 }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={0}
    >
      <Text className="text-2xl font-bold text-center">Novo agendamento</Text>
      <Text className="text-center text-gray-500">
        Preencha todos os campos para realizar um novo agendamento.
      </Text>

      <Controller
        control={control}
        name="clientName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-gray-800 rounded-xl p-4 text-white"
            placeholder="Nome do cliente"
            placeholderTextColor="#aaa"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <View className="bg-gray-800 rounded-xl flex-row items-center p-4">
            <Text className="mr-2">🇧🇷</Text>
            <TextInput
              className="flex-1 text-white"
              placeholder="Telefone"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />

      <Controller
        control={control}
        name="service"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-gray-800 rounded-xl p-4 text-white"
            placeholder="Selecione um serviço"
            placeholderTextColor="#aaa"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="bg-gray-800 rounded-xl p-4 text-white"
            placeholder="Selecione uma data"
            placeholderTextColor="#aaa"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="time"
        render={({ field: { onChange, value } }) => (
          <View className="bg-gray-800 rounded-xl flex-row items-center p-4">
            <TextInput
              className="flex-1 text-white"
              placeholder="Selecione um horário"
              placeholderTextColor="#aaa"
              onChangeText={onChange}
              value={value}
            />
            <Text className="ml-2 text-gray-400">Livre</Text>
          </View>
        )}
      />

      <View className="flex-row items-center justify-between bg-gray-800 rounded-xl p-4">
        <Text className="text-white">Repetir este agendamento</Text>
        <Controller
          control={control}
          name="repeat"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      <Button title="Agendar" onPress={handleSubmit(onSubmit)} />
    </KeyboardAwareScrollView>
  );
}
