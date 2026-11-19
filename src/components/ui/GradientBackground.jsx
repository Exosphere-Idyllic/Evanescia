import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gradients } from '../../theme/gradients';

/**
 * Fondo con degradado fluido estilo agua / espacio exterior y StatusBar integrada.
 *
 * @param {string[]} colors - Colores del degradado. Por defecto usa gradients.screenDefault
 * @param {boolean} safe - Si envuelve el contenido en SafeAreaView
 * @param {string[]} edges - Edges para SafeAreaView ('top'|'bottom'|'left'|'right')
 */
export const GradientBackground = ({
  children,
  colors = gradients.screenDefault,
  style,
  safe = false,
  edges,
  statusBar = 'light',
  ...props
}) => {
  const content = safe ? (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      {children}
    </SafeAreaView>
  ) : (
    <View style={styles.container}>{children}</View>
  );

  return (
    <LinearGradient
      colors={colors}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      {...props}
    >
      <StatusBar style={statusBar} />
      {content}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

export default GradientBackground;
