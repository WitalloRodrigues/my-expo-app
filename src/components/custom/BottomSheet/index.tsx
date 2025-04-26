import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  Dimensions,
  Keyboard,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  setIsOpen,
  children,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 0 : SCREEN_HEIGHT,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  // vamos animar o `top` em vez de height
  const animatedStyle = {
    top: animation,
    bottom: 0,
  };

  return (
    <>
      {/* backdrop */}
      {isOpen && (
        <Pressable
          className="absolute inset-0 bg-black/40 z-40"
          onPress={() => setIsOpen(false)}
        />
      )}

      {/* sheet animado */}
      <Animated.View
        className="absolute left-0 right-0 bg-red-300 mt-11 z-[999] rounded-t-3xl overflow-hidden"
        style={animatedStyle}
      >
        {/* botão fechar */}
        <View className="p-4 ">
          <Pressable
            onPress={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center"
          >
            <Text className="text-xl">×</Text>
          </Pressable>
        </View>

        {/* conteúdo (deixa flex:1 para ocupar o resto) */}
        <View className="flex-1 ">{children}</View>
      </Animated.View>
    </>
  );
};
