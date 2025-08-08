import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { projects } from '../../data/reconnectData';
import { Project } from '../../types/reconnect';
import { useTheme } from '../../hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';

const ProjectCard = ({ item }: { item: Project }) => {
  const { colors } = useTheme();
  const completedSteps = item.steps.filter(step => step.completed).length;
  const progress = (completedSteps / item.steps.length) * 100;

  return (
    <LinearGradient
      colors={[colors.card, colors.cardMuted]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={[styles.category, { color: colors.primary }]}>{item.category}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.description, { color: colors.textMuted }]}>{item.description}</Text>
      <View style={styles.stepsContainer}>
        {item.steps.map((step, index) => (
          <View key={index} style={styles.step}>
            <View style={[styles.stepCheckbox, { borderColor: colors.primary, backgroundColor: step.completed ? colors.primary : 'transparent' }]} />
            <Text style={[styles.stepText, { color: step.completed ? colors.text : colors.textMuted, textDecorationLine: step.completed ? 'line-through' : 'none' }]}>{step.title}</Text>
          </View>
        ))}
      </View>
       <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { backgroundColor: colors.primaryMuted }]}>
          <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
        </View>
        <Text style={[styles.progressText, { color: colors.textMuted }]}>{completedSteps}/{item.steps.length} Steps Done</Text>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
        <Text style={[styles.buttonText, { color: colors.background }]}>Continue Project</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const ProjectsTab = () => {
  return (
    <FlatList
      data={projects}
      renderItem={({ item }) => <ProjectCard item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  stepsContainer: {
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepCheckbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: 12,
  },
  stepText: {
    fontSize: 14,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProjectsTab;
