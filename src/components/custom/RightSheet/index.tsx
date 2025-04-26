import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  Pressable,
  Animated,
  Easing,
  Dimensions,
  BackHandler,
} from "react-native";
import { View } from "react-native";


import { MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get("window").width;
const SHEET_WIDTH = SCREEN_WIDTH * 0.788;

interface RightSheetProps {
  children: React.ReactNode;
}

export const RightSheet: React.FC<RightSheetProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
      const backAction = () => {
        if (isOpen) {
          toggleSheet();
          return true; 
        }
        return true;
      };
    
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    
      return () => backHandler.remove();
    }, [isOpen]);


  const animation = useRef(new Animated.Value(0)).current;

  const toggleSheet = () => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => setIsOpen(!isOpen));
  };

  const sheetTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [SHEET_WIDTH, 0],
  });

  const buttonTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -SHEET_WIDTH],
  });

  return (
    <>
      {/* Botão flutuante */}
      <Animated.View
        className="absolute top-[2.9rem] right-[0.9rem] z-40"
        style={{
          transform: [{ translateX: buttonTranslateX }],
        }}
      >
        <Pressable
          onPress={toggleSheet}
          className={`w-[3.4rem] h-[3.4rem] bg-orange-${isOpen?"600":"700"} rounded-xl items-center justify-center shadow-lg`}
        >
          
          {isOpen ? (
            <AntDesign name="close" size={24} color="white" />
          ):(
            <Entypo name="list" size={24} color="white" />
          )}
        </Pressable>
      </Animated.View>

      {/* Backdrop */}
      {isOpen && (
        <Pressable
          className="absolute inset-0  z-40"
          onPress={toggleSheet}
        />
      )}

      {/* Sheet */}
      <Animated.View
        className="absolute top-0 bottom-0 right-0 bg-slate-900 z-50 "
        style={{
          width: SHEET_WIDTH,
          transform: [{ translateX: sheetTranslateX }],
        }}
      >
        {/* Conteúdo isolado */}
        <View className="flex-1 p-6 mt-8 flex items-center">{children}</View>
      </Animated.View>
    </>
  );
};
