import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  User,
  Image as ImageIcon,
  Brain,
  ShoppingBag,
  Box,
  ChevronRight,
  ClipboardList,
} from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { gradients } from '../theme/gradients';

const MENU_ITEMS = [
  {
    id: 'perfil',
    route: 'Perfil',
    title: 'Mi Perfil',
    subtitle: 'Información de usuario y edición',
    icon: User,
    color: colors.accent.primary,
  },
  {
    id: 'imagen',
    route: 'Imagen',
    title: 'Galería Rick & Morty',
    subtitle: 'Explorar personajes del multiverso',
    icon: ImageIcon,
    color: colors.accent.info,
  },
  {
    id: 'quiz',
    route: 'Quiz',
    title: 'Trivia Evanescia',
    subtitle: 'Preguntas con sistema de gracia',
    icon: Brain,
    color: colors.accent.warning,
    badge: 'Popular',
  },
  {
    id: 'productos',
    route: 'Productos',
    title: 'Catálogo FakeStore',
    subtitle: 'Tienda de artículos y compras',
    icon: ShoppingBag,
    color: colors.accent.success,
  },
  {
    id: 'caja',
    route: 'Caja',
    title: 'Caja',
    subtitle: 'Prueba de navegación a Home',
    icon: Box,
    color: colors.accent.primaryLight,
  },
  {
    id: 'registro',
    route: 'Registro',
    title: 'Registro',
    subtitle: 'Formulario con validación Formik + Yup',
    icon: ClipboardList,
    color: colors.accent.success,
  },
];

const Home = ({ navigation }) => {
  return (
    <GradientBackground colors={gradients.screenDefault} safe>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Evanescia</Text>
          <Text style={styles.appSubtitle}>
            Explora las secciones y módulos disponibles
          </Text>
        </View>

        {/* Sección de Módulos */}
        <View style={styles.modulesContainer}>
          <Text style={styles.sectionLabel}>PANTALLAS DISPONIBLES</Text>

          {MENU_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(item.route)}
                style={styles.touchableCard}
              >
                <GlassCard variant="default" style={styles.card}>
                  <View style={styles.cardContent}>
                    <View
                      style={[
                        styles.iconContainer,
                        {
                          backgroundColor: `${item.color}1A`,
                          borderColor: `${item.color}4D`,
                        },
                      ]}
                    >
                      <IconComponent size={22} color={item.color} />
                    </View>

                    <View style={styles.textContainer}>
                      <View style={styles.titleRow}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        {item.badge && (
                          <Badge
                            text={item.badge}
                            variant="warning"
                            size="sm"
                            style={styles.cardBadge}
                          />
                        )}
                      </View>
                      <Text style={styles.cardSubtitle} numberOfLines={1}>
                        {item.subtitle}
                      </Text>
                    </View>

                    <ChevronRight size={18} color={colors.text.muted} />
                  </View>
                </GlassCard>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  appTitle: {
    ...typography.h1,
    fontSize: 32,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  appSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  modulesContainer: {
    gap: spacing.md,
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.text.muted,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  touchableCard: {
    borderRadius: borderRadius.lg,
  },
  card: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  cardBadge: {
    marginLeft: spacing.sm,
  },
  cardSubtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
});

export default Home;
