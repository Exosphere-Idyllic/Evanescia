import { useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { gradients } from '../theme/gradients';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={gradients.midnight}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style="light" />

      {/* Portada del álbum */}
      <View style={styles.albumWrapper}>
        <Image
          source={require('../../assets/splash-icon.png')}
          style={styles.albumArt}
          resizeMode="cover"
        />
        {/* Overlay sutil para suavizar bordes */}
        <LinearGradient
          colors={['transparent', 'rgba(15,23,42,0.45)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
        />
      </View>

      {/* Footer con nombre de app y crédito */}
      <View style={styles.footer}>
        <Text style={styles.appName}>Evanescia</Text>
        <Text style={styles.tagline}>Yumeno Garden · Last Dinosaurs</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumWrapper: {
    width: 280,
    height: 280,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: `${colors.accent.primary}55`,
    // Glow neón en iOS
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 28,
  },
  albumArt: {
    width: '100%',
    height: '100%',
  },
  footer: {
    marginTop: spacing.xxl + spacing.md,
    alignItems: 'center',
  },
  appName: {
    ...typography.h1,
    fontSize: 30,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.text.muted,
    marginTop: spacing.xs,
    letterSpacing: 0.5,
  },
});

export default SplashScreen;