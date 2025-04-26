import { Button, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react";
import { RightSheet } from "~/components/custom/RightSheet";
import { RightSheetWithButton } from "~/components/custom/BottomSheet";

export default function Home() {
    return (
        <View style={{ flex: 1 }}>
          <RightSheetWithButton>
            <Text style={{ fontSize: 18 }}>Conteúdo do Menu Lateral</Text>
          </RightSheetWithButton>
        </View>
      );
}