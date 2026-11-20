import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { User, Calendar, Mail, Save } from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { TextInput } from '../components/ui/TextInput';
import { Button } from '../components/ui/Button';
import CustomAlert from '../components/ui/CustomAlert';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { gradients } from '../theme/gradients';

/* ── Esquema de validación Yup ─────────────────────────────── */
const registroSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'Mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('El nombre es requerido'),
  edad: Yup.number()
    .typeError('Debe ser un número')
    .integer('Debe ser un número entero')
    .min(1, 'Edad mínima: 1')
    .max(120, 'Edad máxima: 120')
    .required('La edad es requerida'),
  correo: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es requerido'),
});

/* ── Pantalla de Registro ──────────────────────────────────── */
const Registro = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ nombre: '', edad: '', correo: '' });

  const handleGuardar = (values, { resetForm }) => {
    console.log('📋 Datos del formulario:', values);
    setAlertData(values);
    setAlertVisible(true);

    // Reset del formulario al cerrar el alert (se pasa el callback)
    // Lo guardamos para llamarlo desde el onClose
    setAlertData({ ...values, _resetForm: resetForm });
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    if (alertData._resetForm) {
      alertData._resetForm();
    }
  };

  const alertMessage =
    `Nombre:  ${alertData.nombre}\n` +
    `Edad:       ${alertData.edad}\n` +
    `Correo:   ${alertData.correo}`;

  return (
    <GradientBackground colors={gradients.screenDefault} safe edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Encabezado */}
          <View style={styles.header}>
            <Text style={styles.title}>Registro</Text>
            <Text style={styles.subtitle}>
              Completa los campos para guardar tu información
            </Text>
          </View>

          {/* Formulario dentro de GlassCard */}
          <GlassCard variant="elevated" glow glowColor={colors.accent.primary}>
            <Formik
              initialValues={{ nombre: '', edad: '', correo: '' }}
              validationSchema={registroSchema}
              validateOnChange={false}
              validateOnBlur
              onSubmit={handleGuardar}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View style={styles.form}>

                  {/* Campo: Nombre */}
                  <TextInput
                    label="Nombre"
                    placeholder="Ej. Juan Pérez"
                    value={values.nombre}
                    onChangeText={handleChange('nombre')}
                    onBlur={handleBlur('nombre')}
                    icon={User}
                    error={touched.nombre && errors.nombre ? errors.nombre : undefined}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />

                  {/* Campo: Edad */}
                  <TextInput
                    label="Edad"
                    placeholder="Ej. 22"
                    value={values.edad}
                    onChangeText={handleChange('edad')}
                    onBlur={handleBlur('edad')}
                    icon={Calendar}
                    keyboardType="numeric"
                    error={touched.edad && errors.edad ? errors.edad : undefined}
                    returnKeyType="next"
                  />

                  {/* Campo: Correo */}
                  <TextInput
                    label="Correo electrónico"
                    placeholder="Ej. juan@correo.com"
                    value={values.correo}
                    onChangeText={handleChange('correo')}
                    onBlur={handleBlur('correo')}
                    icon={Mail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    error={touched.correo && errors.correo ? errors.correo : undefined}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />

                  {/* Botón guardar */}
                  <Button
                    title="Guardar"
                    variant="primary"
                    icon={Save}
                    iconPosition="left"
                    fullWidth
                    loading={isSubmitting}
                    onPress={handleSubmit}
                    style={styles.submitBtn}
                  />
                </View>
              )}
            </Formik>
          </GlassCard>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Notificación personalizada */}
      <CustomAlert
        visible={alertVisible}
        title="¡Registro guardado!"
        message={alertMessage}
        variant="success"
        onClose={handleCloseAlert}
      />
    </GradientBackground>
  );
};

/* ── Estilos ───────────────────────────────────────────────── */
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    fontSize: 30,
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  form: {
    gap: spacing.xs,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
});

export default Registro;
