import React from 'react';
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

interface ScrollToTopProps {
  showScrollTop: boolean;
  scrollToTop: () => void;
}

export function ScrollToTop({ showScrollTop, scrollToTop }: ScrollToTopProps) {
  if (!showScrollTop) return null;

  return (
    <TouchableOpacity
      onPress={scrollToTop}
      className="absolute bottom-24 right-6 p-3 bg-orange-700 rounded-2xl shadow-lg"
    >
      <MaterialIcons name="keyboard-arrow-up" size={28} color="white" />
    </TouchableOpacity>
  );
}
