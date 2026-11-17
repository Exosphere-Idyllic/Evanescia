import { View, Text, StyleSheet } from 'react-native';

export default function ProgressBar({ current, total }) {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.counterText}>
          Pregunta <Text style={styles.boldText}>{current}</Text> de {total}
        </Text>
        <Text style={styles.percentText}>{Math.round(percentage)}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  counterText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  boldText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  percentText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  track: {
    height: 6,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
  },
});
