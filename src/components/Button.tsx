import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useTheme } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors, typography, spacing, radii } = useTheme();

  const getContainerStyle = (pressed: boolean): ViewStyle => {
    const base: ViewStyle = {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : pressed ? 0.85 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...base,
          backgroundColor: pressed ? colors.primaryHover : colors.primary,
        };
      case 'secondary':
        return {
          ...base,
          backgroundColor: colors.secondary,
        };
      case 'outline':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: pressed ? colors.primary : colors.border,
        };
      case 'ghost':
        return {
          ...base,
          backgroundColor: pressed ? colors.muted : 'transparent',
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    };

    switch (variant) {
      case 'primary':
        return { ...base, color: colors.primaryForeground };
      case 'secondary':
        return { ...base, color: colors.secondaryForeground };
      case 'outline':
        return { ...base, color: colors.foreground };
      case 'ghost':
        return { ...base, color: colors.foreground };
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [getContainerStyle(pressed), style]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.primaryForeground : colors.primary}
        />
      ) : typeof children === 'string' ? (
        <Text style={[getTextStyle(), textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export default Button;
