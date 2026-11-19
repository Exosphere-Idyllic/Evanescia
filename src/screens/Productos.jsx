import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { ShoppingBag, ChevronRight } from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Badge } from '../components/ui/Badge';
import { Rating } from '../components/ui/Rating';
import { SectionHeader } from '../components/ui/SectionHeader';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ErrorScreen } from '../components/ui/ErrorScreen';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { gradients } from '../theme/gradients';

const API_URL = 'https://fakestoreapi.com/products';

const Productos = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [refrescando, setRefrescando] = useState(false);

  const cargarProductos = async (esRefresco = false) => {
    if (esRefresco) {
      setRefrescando(true);
    } else {
      setCargando(true);
    }
    setError(null);

    try {
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) {
        throw new Error(`Error en el servidor: ${respuesta.status}`);
      }
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los productos');
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useEffect(() => {
    let activo = true;

    fetch(API_URL)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error(`Error en el servidor: ${respuesta.status}`);
        }
        return respuesta.json();
      })
      .then((datos) => {
        if (activo) {
          setProductos(datos);
          setCargando(false);
        }
      })
      .catch((err) => {
        if (activo) {
          setError(err.message || 'No se pudieron cargar los productos');
          setCargando(false);
        }
      });

    return () => {
      activo = false;
    };
  }, []);

  const irADetalle = (producto) => {
    navigation.navigate('DetalleProducto', {
      producto,
      id: producto.id,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => irADetalle(item)}
      style={styles.touchableCard}
    >
      <GlassCard variant="default" style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.thumbnail}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoContainer}>
          <Badge
            text={item.category}
            variant="info"
            size="sm"
            style={styles.badge}
          />

          <Text style={styles.titulo} numberOfLines={2}>
            {item.title}
          </Text>

          {item.rating && (
            <Rating
              rate={item.rating.rate}
              count={item.rating.count}
              size={13}
              style={styles.rating}
            />
          )}

          <View style={styles.footerRow}>
            <Text style={styles.precio}>${Number(item.price).toFixed(2)}</Text>
            <View style={styles.verMasBtn}>
              <Text style={styles.verMasTexto}>Detalles</Text>
              <ChevronRight size={14} color={colors.accent.primaryLight} />
            </View>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );

  if (cargando && !refrescando) {
    return <LoadingScreen message="Cargando catálogo de productos..." />;
  }

  if (error && productos.length === 0) {
    return (
      <ErrorScreen
        title="Catálogo no disponible"
        message={error}
        onRetry={() => cargarProductos(false)}
      />
    );
  }

  return (
    <GradientBackground colors={gradients.screenDefault} safe edges={['bottom', 'left', 'right']}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refrescando}
            onRefresh={() => cargarProductos(true)}
            colors={[colors.accent.primary]}
            tintColor={colors.accent.primary}
          />
        }
        ListHeaderComponent={
          <SectionHeader
            title="Explorar Productos"
            subtitle="Artículos seleccionados con diseño glassmorphism"
            icon={ShoppingBag}
            iconColor={colors.accent.primary}
            style={styles.header}
          />
        }
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.lg,
    marginTop: spacing.xs,
  },
  touchableCard: {
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  imageContainer: {
    width: 95,
    height: 115,
    borderRadius: borderRadius.md,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xs,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.lg,
    justifyContent: 'space-between',
  },
  badge: {
    marginBottom: spacing.xs,
  },
  titulo: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  rating: {
    marginBottom: spacing.xs,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  precio: {
    ...typography.h3,
    color: colors.accent.success,
    fontWeight: '900',
  },
  verMasBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.glass.borderLight,
  },
  verMasTexto: {
    ...typography.caption,
    color: colors.accent.primaryLight,
    marginRight: 2,
  },
});

export default Productos;
