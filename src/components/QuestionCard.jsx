import { View, Text, StyleSheet } from 'react-native';
import { BLOCKS_INFO, DIFFICULTY_INFO } from '../utils/theme';

export default function QuestionCard({ question }) {
  if (!question) return null;

  const blockData = BLOCKS_INFO[question.block] || {
    name: question.block,
    icon: '✨',
  };

  const diffData = DIFFICULTY_INFO[question.difficulty] || {
    label: question.difficulty,
    badgeBg: 'rgba(255, 255, 255, 0.2)',
    badgeText: '#FFFFFF',
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.blockBadge}>
          <Text style={styles.blockIcon}>{blockData.icon}</Text>
          <Text style={styles.blockName}>{blockData.name}</Text>
        </View>

        <View style={[styles.diffBadge, { backgroundColor: diffData.badgeBg }]}>
          <Text style={[styles.diffText, { color: diffData.badgeText }]}>
            {diffData.label}
          </Text>
        </View>
      </View>

      <Text style={styles.questionText}>{question.question}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: 20,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minHeight: 140,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  blockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  blockIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  blockName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  diffBadge: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 10,
  },
  diffText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0.2,
  },
});
