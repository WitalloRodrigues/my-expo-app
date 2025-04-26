import { Text, TouchableOpacity, View } from "react-native";

export function ConfigScheduleDay(){
    return (
        <>
            <View className="p-6 mt-8 bg-gray-100 flex items-center justify-center">
                <TouchableOpacity className='flex justify-center items-center bg-slate-900 rounded-xl px-6'>
                <Text className='uppercase p-3 text-white'>
                    Modificar apenas este dia
                </Text>
                </TouchableOpacity>
                <View className='flex justify-center items-center'>
                <Text className='text-sm mt-8'>
                    Seu hórario de funcionamento cadastrado
                </Text>
                <Text className='text-sm'>
                    é das {' '}
                    <Text className='font-bold text-orange-700 text-sm'>
                    09:00hrs às 18:00hrs.
                    </Text>
                </Text>
                </View>
                
                <TouchableOpacity className='mt-4'>
                <Text className='underline text-orange-700'>
                    Editar horários
                </Text>
                </TouchableOpacity>
                <View>
                <View className="mt-4 pt-4  flex items-center">
                  <Text className="text-xs text-gray-600 flex flex-row items-center">
                    <Text className="font-semibold ">AgendaAE</Text>{' '}
                    <Text className="mx-1 text-gray-400">•</Text>{' '}
                    <Text className="font-medium">Versão 1.0.0</Text>
                  </Text>
                </View>
                </View>   
            </View>
        </>
    )
}