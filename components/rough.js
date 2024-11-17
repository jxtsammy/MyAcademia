import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const TaskManager = () => {
  const [activeTab, setActiveTab] = useState('Task List');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Works',
      count: 3,
      color: '#FFE8B2',
      icon: '💼',
      tasks: [
        { id: 1, title: 'Email Check', completed: true, icon: '📧' },
        { id: 2, title: 'Weekly Meeting', completed: false, icon: '👥' },
        { id: 3, title: 'Project Review', completed: false, icon: '📊' },
      ]
    },
    {
      id: 2,
      name: 'Sport',
      count: 10,
      color: '#E8F5E9',
      icon: '🏃',
      tasks: [
        { id: 4, title: 'Morning Run', completed: false, icon: '🏃' },
        { id: 5, title: 'Gym Session', completed: true, icon: '💪' },
        { id: 6, title: 'Tennis Practice', completed: false, icon: '🎾' },
      ]
    },
    {
      id: 3,
      name: 'Habits',
      count: 4,
      color: '#E3F2FD',
      icon: '✨',
      tasks: [
        { id: 7, title: 'Read 30 mins', completed: false, icon: '📚' },
        { id: 8, title: 'Meditate', completed: true, icon: '🧘' },
        { id: 9, title: 'Journal', completed: false, icon: '📝' },
      ]
    },
  ];

  const allTasks = categories.flatMap(category => category.tasks);
  const completedTasks = allTasks.filter(task => task.completed);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item)}
      style={[
        styles.categoryCard,
        { backgroundColor: item.color },
        selectedCategory?.id === item.id && styles.selectedCategoryCard
      ]}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
      <Text style={styles.categoryCount}>+{item.tasks.length} task</Text>
    </TouchableOpacity>
  );

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity style={styles.taskItem}>
      <View style={styles.taskLeft}>
        <Text style={styles.taskIcon}>{item.icon}</Text>
        <Text style={styles.taskTitle}>{item.title}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.completed && styles.checkboxChecked
        ]}
      >
        {item.completed && (
          <Feather name="check" size={16} color="white" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
      <View style={styles.container}>
        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Task List' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Task List')}
          >
            <Text style={styles.tabText}>Task List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'Completed' && styles.activeTab
            ]}
            onPress={() => setActiveTab('Completed')}
          >
            <Text style={styles.tabText}>Completed</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        {/* Categories List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id.toString()}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContentContainer}
        />

        {/* Task List Section */}
        <View style={styles.taskListContainer}>
          <View style={styles.taskListHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'Completed' ? 'Completed Tasks' :
               selectedCategory ? `${selectedCategory.name} Tasks` : 'All Tasks'}
            </Text>
          </View>

          {/* Tasks */}
          <FlatList
            data={activeTab === 'Completed' ? completedTasks :
                  selectedCategory ? selectedCategory.tasks : allTasks}
            renderItem={renderTaskItem}
            keyExtractor={item => item.id.toString()}
            style={styles.taskList}
            contentContainerStyle={styles.taskListContent}
          />
        </View>
        <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#01796f',
    borderRadius: 30,
    padding: 5,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    left: 40
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  categoriesContainer: {
    maxHeight: 140,
    padding: 10,
  },
  categoriesContentContainer: {
    paddingRight: 20,
  },
  categoryCard: {
    width: 120,
    height: 120,
    borderRadius: 20,
    borderTopRightRadius: 70,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  selectedCategoryCard: {
    borderWidth: 2,
    borderColor: '#000',
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  taskListContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    width: '100%'
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskList: {
    flex: 1,
  },
  taskListContent: {
    paddingBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#01796f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#01796f',
  },
  plusButton: {
    position: 'absolute',
    right: 20,
    bottom: 45,
    backgroundColor: '#fff',
    borderRadius: 60,
    padding: 10,
    height: 50,
    width: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  plusButtonText: {
    fontSize: 40,
    color: '#01796F',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TaskManager;