import React, { useRef } from "react";
import { View, Text } from "react-native";
import PhoneInput from "react-native-phone-number-input";

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function PhoneInputField({ value, onChange, label }: PhoneInputFieldProps) {
  const phoneInputRef = useRef<PhoneInput>(null);

  return (
    <View>
      {label && <Text className="mb-1 text-base">{label}</Text>}
      <PhoneInput
        ref={phoneInputRef}
        defaultValue={value}
        defaultCode="BR"
        layout="first"
        onChangeFormattedText={onChange}
        containerStyle={{ borderRadius: 16, backgroundColor: '#f3f4f6', height: 50 ,width: '100%', alignItems: 'center' , justifyContent: 'center', padding: 0 }}
        textContainerStyle={{ borderRadius: 16, backgroundColor: '#f3f4f6', height: 50 }}
        textInputStyle={{ fontSize: 16 , height: 50, paddingLeft: 10 }}
        countryPickerButtonStyle={{ paddingLeft: 10 }}
      />
    </View>
  );
}
