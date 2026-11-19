import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  CreditCard,
  Truck,
  ArrowLeft,
} from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Rating } from '../components/ui/Rating';
import { Button } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ErrorScreen } from '../components/ui/ErrorScreen';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { gradients } from '../theme/gradients';

const API_URL = 'https://fakestoreapi.com/products';

const DetalleProducto = ({ route, navigation }) => {
  const { producto: productoInicial, id } = route.params || {};

  const [producto, setProducto] = useState(productoInicial || null);
  const [cargando, setCargando] = useState(!productoInicial && !!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!producto && id) {
      let activo = true;
      fetch(`${API_URL}/${id}`)
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status}`);
          }
          return respuesta.json();
        })
        .then((datos) => {
          if (activo) {
            setProducto(datos);
            setCargando(false);
          }
        })
        .catch((err) => {
          if (activo) {
            setError(err.message || 'No se pudo obtener el detalle del producto');
            setCargando(false);
          }
        });

      return () => {
        activo = false;
      };
    }
  }, [id, producto]);

  const handleComprar = () => {
    if (!producto) return;
    Alert.alert(
      'Confirmar Pedido',
      `Has seleccionado:\n"${producto.title}"\n\nTotal: $${Number(producto.price).toFixed(2)}\n\n¿Deseas finalizar la compra?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar Compra',
          onPress: () => {
            Alert.alert('¡Compra Procesada!', 'Tu orden fue confirmada con éxito.', [
              { text: 'Volver al catálogo', onPress: () => navigation.goBack() },
            ]);
          },
        },
      ]
    );
  };

  if (cargando) {
    return <LoadingScreen message="Cargando información del producto..." />;
  }

  if (error || !producto) {
    return (
      <ErrorScreen
        title="Producto no disponible"
        message={error || 'No se pudieron recuperar los datos de este artículo.'}
        onRetry={() => navigation.goBack()}
        retryText="Volver al catálogo"
      />
    );
  }

  return (
    <GradientBackground colors={gradients.screenDefault}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Contenedor de la Imagen */}
        <View style={styles.imageCard}>
          <Image
            source={{ uri: producto.image }}
            style={styles.imagenGrande}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detallesContainer}>
          {/* Header con Categoría y Rating */}
          <View style={styles.headerInfo}>
            <Badge text={producto.category} variant="info" size="md" />

            {producto.rating && (
              <Rating
                rate={producto.rating.rate}
                count={producto.rating.count}
                size={16}
              />
            )}
          </View>

          {/* Título */}
          <Text style={styles.titulo}>{producto.title}</Text>

          {/* Tarjeta de Precio con Glassmorphism */}
          <GlassCard variant="water" style={styles.precioCard}>
            <View>
              <Text style={styles.precioEtiqueta}>Precio Especial</Text>
              <Text style={styles.precio}>${Number(producto.price).toFixed(2)}</Text>
            </View>
            <Badge
              text="Envío gratis"
              variant="success"
              icon={Truck}
              size="sm"
            />
          </GlassCard>

          {/* Descripción */}
          <GlassCard variant="default" style={styles.seccionDescripcion}>
            <Text style={styles.subtituloSeccion}>Descripción del Producto</Text>
            <Divider style={styles.divider} />
            <Text style={styles.descripcionTexto}>{producto.description}</Text>
          </GlassCard>

          {/* Botones de acción */}
          <View style={styles.actionsGroup}>
            <Button
              title="Comprar Ahora"
              onPress={handleComprar}
              variant="primary"
              icon={CreditCard}
              size="lg"
              fullWidth
            />
            <Button
              title="Regresar a la tienda"
              onPress={() => navigation.goBack()}
              variant="glass"
              icon={ArrowLeft}
              fullWidth
            />
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  imageCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  imagenGrande: {
    width: '100%',
    height: '100%',
  },
  detallesContainer: {
    padding: spacing.xl,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  titulo: {
    ...typography.h2,
    color: colors.text.primary,
    lineHeight: 28,
    marginBottom: spacing.lg,
  },
  precioCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  precioEtiqueta: {
    ...typography.caption,
    color: colors.text.muted,
  },
  precio: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.accent.success,
  },
  seccionDescripcion: {
    marginBottom: spacing.xl,
  },
  subtituloSeccion: {
    ...typography.h3,
    color: colors.text.primary,
  },
  divider: {
    marginVertical: spacing.sm,
  },
  descripcionTexto: {
    ...typography.bodySmall,
    lineHeight: 22,
    color: colors.text.secondary,
  },
  actionsGroup: {
    gap: spacing.md,
  },
});

export default DetalleProducto;
