import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Eye } from 'lucide-react-native';
import { GradientBackground } from '../components/ui/GradientBackground';
import { GlassCard } from '../components/ui/GlassCard';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { ErrorScreen } from '../components/ui/ErrorScreen';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { gradients } from '../theme/gradients';

const Imagen = ({ navigation }) => {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarPersonajes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://rickandmortyapi.com/api/character');
      if (!response.ok) throw new Error('No se pudo obtener la lista de personajes.');

      const data = await response.json();
      const filtrados = data.results.map((p) => ({
        id: p.id,
        nombre: p.name,
        imagen: p.image,
        estado: p.status,
        especie: p.species,
        genero: p.gender,
        origen: p.origin.name,
      }));

      setPersonajes(filtrados);
    } catch (err) {
      setError(err.message || 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener la lista de personajes.');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          const filtrados = data.results.map((p) => ({
            id: p.id,
            nombre: p.name,
            imagen: p.image,
            estado: p.status,
            especie: p.species,
            genero: p.gender,
            origen: p.origin.name,
          }));
          setPersonajes(filtrados);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error de conexión');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'success';
      case 'dead':
        return 'danger';
      default:
        return 'default';
    }
  };

  const renderItem = ({ item }) => (
    <GlassCard variant="default" style={styles.card}>
      <Avatar
        uri={item.imagen}
        size={70}
        borderColor={item.estado === 'Alive' ? colors.accent.success : colors.accent.primary}
        glow={item.estado === 'Alive'}
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.nombre}
        </Text>

        <View style={styles.badgesRow}>
          <Badge
            text={item.estado}
            variant={getStatusBadgeVariant(item.estado)}
            size="sm"
          />
          <Badge
            text={item.especie}
            variant="default"
            size="sm"
            style={styles.speciesBadge}
          />
        </View>

        <Button
          title="Ver Detalle"
          onPress={() => navigation.navigate('Detalle', { personaje: item })}
          variant="outline"
          icon={Eye}
          size="sm"
          style={styles.detailButton}
        />
      </View>
    </GlassCard>
  );

  if (loading) {
    return <LoadingScreen message="Cargando personajes del multiverso..." />;
  }

  if (error) {
    return (
      <ErrorScreen
        title="Error de Carga"
        message={error}
        onRetry={cargarPersonajes}
      />
    );
  }

  return (
    <GradientBackground colors={gradients.water}>
      <FlatList
        data={personajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  info: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  name: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  speciesBadge: {
    marginLeft: spacing.xs,
  },
  detailButton: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 12,
    minHeight: 30,
  },
});

export default Imagen;
