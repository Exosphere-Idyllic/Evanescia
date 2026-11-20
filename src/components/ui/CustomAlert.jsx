import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { gradients } from '../../theme/gradients';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

/**
 * Notificación modal personalizada con estética dark glassmorphism / BLK Design System.
 *
 * @param {boolean}  visible  - Muestra u oculta el modal
 * @param {string}   title    - Título de la notificación
 * @param {string}   message  - Cuerpo del mensaje
 * @param {'success'|'info'|'warning'|'danger'} variant - Color de acento
 * @param {Function} onClose  - Callback al cerrar
 */
const CustomAlert = ({
  visible = false,
  title = '',
  message = '',
  variant = 'success',
  onClose,
}) => {
  /* ── configuración de variante ──────────────────────────── */
  const variantConfig = {
    success: {
      gradient: gradients.success,
      iconColor: colors.accent.success,
      glowColor: colors.accent.success,
      Icon: CheckCircle,
    },
    info: {
      gradient: gradients.info,
      iconColor: colors.accent.info,
      glowColor: colors.accent.info,
      Icon: Info,
    },
    warning: {
      gradient: gradients.warning,
      iconColor: colors.accent.warning,
      glowColor: colors.accent.warning,
      Icon: AlertTriangle,
    },
    danger: {
      gradient: gradients.danger,
      iconColor: colors.accent.danger,
      glowColor: colors.accent.danger,
      Icon: XCircle,
    },
  };

  const { gradient, iconColor, glowColor, Icon } =
    variantConfig[variant] ?? variantConfig.success;

  /* ── render ─────────────────────────────────────────────── */
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Overlay — toque fuera cierra el alert */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      {/* Tarjeta central — no propaga el toque al overlay */}
      <View style={styles.centeredView} pointerEvents="box-none">
        <View style={[styles.card, shadows.glow(glowColor, 0.3)]}>

          {/* Franja superior con gradiente */}
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.topBar}
          />

          {/* Contenido */}
          <View style={styles.content}>
            {/* Cabecera: ícono + título + botón X */}
            <View style={styles.header}>
              <View style={[styles.iconBg, { backgroundColor: `${iconColor}20` }]}>
                <Icon size={22} color={iconColor} />
              </View>

              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>

              <TouchableOpacity
                onPress={onClose}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={styles.closeBtn}
              >
                <X size={18} color={colors.text.muted} />
              </TouchableOpacity>
            </View>

            {/* Separador */}
            <View style={[styles.divider, { backgroundColor: `${iconColor}25` }]} />

            {/* Mensaje */}
            <Text style={styles.message}>{message}</Text>

            {/* Botón de acción */}
            <TouchableOpacity onPress={onClose} activeOpacity={0.85} style={styles.btnWrapper}>
              <LinearGradient
                colors={gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Cerrar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

/* ── estilos ──────────────────────────────────────────────── */
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  centeredView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.background.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glass.border,
  },
  topBar: {
    height: 4,
    width: '100%',
  },
  content: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    flex: 1,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  divider: {
    height: 1,
    marginVertical: spacing.xs,
  },
  message: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  btnWrapper: {
    marginTop: spacing.sm,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  btn: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  btnText: {
    ...typography.button,
    color: colors.text.primary,
  },
});

export default CustomAlert;
