import React, { useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  Dimensions,
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

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const sheetTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT, 0],
  });

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <Pressable
          className="absolute inset-0 bg-black/40 z-40"
          onPress={() => setIsOpen(false)}
        />
      )}

      {/* Sheet */}
      <Animated.View
        className="absolute left-0 right-0 bg-white z-50 rounded-t-3xl overflow-hidden"
        style={{
          height: SCREEN_HEIGHT,
          bottom: 0,
          transform: [{ translateY: sheetTranslateY }],
        }}
      >
        {/* Botão de fechar */}
        <View className=" p-4">
          <Pressable
            onPress={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-300 items-center justify-center"
          >
            <Text className="text-xl">x</Text>
          </Pressable>
        </View>

        {/* Conteúdo */}
        <View className="flex-1 px-4">{children}</View>
      </Animated.View>
    </>
  );
};
