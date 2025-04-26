// src/components/custom/BottomSheet.tsx
import React, { useRef, useEffect } from "react";
import { Animated, Easing, Dimensions, Pressable, Text, View } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SHEET_HEIGHT = SCREEN_HEIGHT ;

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen(open: boolean): void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, setIsOpen, children }: BottomSheetProps) {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? 0 : SHEET_HEIGHT,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const overlayOpacity = translateY.interpolate({
    inputRange: [0, SHEET_HEIGHT],
    outputRange: [0.4, 0],
  });

  return (
    <>
      {/* overlay */}
      <Animated.View
      />

      {/* sheet */}
      <Animated.View
        className="absolute left-0 right-0 bottom-0 top-0 mt-10 bg-red-200 z-[99] rounded-t-3xl"
        style={{
          height: SHEET_HEIGHT,
          transform: [{ translateY }],
        }}
      >

        {/* conteúdo */}
        <View className="flex-1 ">{children}</View>
      </Animated.View>
    </>
  );
}
