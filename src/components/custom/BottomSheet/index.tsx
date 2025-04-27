// src/components/custom/BottomSheet.tsx
import React, { useRef, useEffect } from "react";
import {
  Animated,
  Easing,
  Dimensions,
  Pressable,
  ViewStyle,
  StyleProp,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen(open: boolean): void;
  children: React.ReactNode;
  /**
   * Altura (em px) que o sheet ocupará quando aberto.
   * Se passar valor entre 0 e 1, será interpretado como % da altura da tela.
   * Default = 1 (100% da tela).
   */
  openHeight?: number;
  /** Opacidade máxima do overlay (0–1). Default = 0.4 */
  overlayOpacityMax?: number;
  /** Estilo adicional para o container do sheet */
  sheetStyle?: StyleProp<ViewStyle>;
  /** zIndex do sheet (útil para nested sheets) */
  zIndex?: number;
}

export function BottomSheet({
  isOpen,
  setIsOpen,
  children,
  openHeight = 1,
  overlayOpacityMax = 0.4,
  sheetStyle,
  zIndex = 99,
}: BottomSheetProps) {
  const rawOpenHeight =
    openHeight > 0 && openHeight <= 1 ? SCREEN_HEIGHT * openHeight : openHeight;
  const closedY = SCREEN_HEIGHT;
  const openY = SCREEN_HEIGHT - rawOpenHeight;

  const translateY = useRef(new Animated.Value(closedY)).current;

  // anima translateY
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isOpen ? openY : closedY,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isOpen, openY, closedY, translateY]);

  // interpolação de opacidade do overlay
  const overlayOpacity = translateY.interpolate({
    inputRange: [openY, closedY],
    outputRange: [overlayOpacityMax, 0],
    extrapolate: "clamp",
  });

  return (
    <>
      {/* overlay clicável */}
      <Pressable
        pointerEvents={isOpen ? "auto" : "none"}
        onPress={() => setIsOpen(false)}
        className="absolute inset-0"
        style={{ zIndex }}
      >
        <Animated.View
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </Pressable>

      {/* sheet */}
      <Animated.View
       className="absolute left-0 right-0 bottom-0 top-0 mt-10 bg-red-200 z-[99] rounded-t-3xl"
        style={[
          {
            transform: [{ translateY }],
            height: rawOpenHeight,
            zIndex: zIndex + 1,
          },
          sheetStyle,
        ]}
      >
        <View className="flex-1">{children}</View>
      </Animated.View>
    </>
  );
}
