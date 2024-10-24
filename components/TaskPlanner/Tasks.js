import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomCheckbox = ({ checked, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.checkbox, { backgroundColor: checked ? '#ffff' : '#fff', borderColor: checked ? '#fff' : '#ccc' }]}
      onPress={onPress}
    >
      {checked && <Text style={styles.checkboxText}>✔</Text>}
    </TouchableOpacity>
  );
};

const TaskItem = ({ task, color, options, checkboxes, toggleCheckbox, deleteTask, isSearchEmpty }) => {
  const [expanded, setExpanded] = useState(false);
  const [animatedHeight] = useState(new Animated.Value(0));

  // Collapse all tasks when the search query is cleared
  useEffect(() => {
    if (isSearchEmpty && expanded) {
      setExpanded(false);
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSearchEmpty]);

  const toggleExpand = () => {
    setExpanded(!expanded);

    Animated.timing(animatedHeight, {
      toValue: expanded ? 0 : options.length * 40, // Adjust height based on options
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.taskContainer}>
      <TouchableOpacity style={[styles.task, { backgroundColor: color }]} onPress={toggleExpand}>
        <View style={styles.taskHeader}>
          <Text style={styles.taskText}>{task}</Text>

          {/* Bin icon to delete task */}
          <TouchableOpacity onPress={() => deleteTask(task)}>
            <Icon name="trash-bin" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
          {checkboxes.map((checkbox, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <CustomCheckbox checked={checkbox.checked} onPress={() => toggleCheckbox(task, index)} />
              <Text>{checkbox.label}</Text>
            </View>
          ))}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default function TaskList({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');

  // State to hold the checkbox states for each task
  const [checkboxStates, setCheckboxStates] = useState({
    'Wash': [{ label: 'Option 1', checked: false }, { label: 'Option 2', checked: false }],
    'Shopping': [{ label: 'Option A', checked: false }, { label: 'Option B', checked: false }],
    'Games': [{ label: 'Level 1', checked: false }, { label: 'Level 2', checked: false }],
    'Study': [{ label: 'Chapter 1', checked: false }, { label: 'Chapter 2', checked: false }],
  });

  // List of tasks
  const [tasks, setTasks] = useState([
    { task: 'Wash', color: '#f28b82', options: ['Option 1', 'Option 2'] },
    { task: 'Shopping', color: '#fbbc04', options: ['Option A', 'Option B'] },
    { task: 'Games', color: '#34a853', options: ['Level 1', 'Level 2'] },
    { task: 'Study', color: '#fb72ff', options: ['Chapter 1', 'Chapter 2'] },
  ]);

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(item => item.task.toLowerCase().includes(searchQuery.toLowerCase()));

  // Toggle checkbox checked state
  const toggleCheckbox = (task, index) => {
    setCheckboxStates(prevState => {
      const newCheckboxStates = { ...prevState };
      newCheckboxStates[task][index].checked = !newCheckboxStates[task][index].checked;
      return newCheckboxStates;
    });
  };

  // Function to delete a task
  const deleteTask = (task) => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${task}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => {
            setTasks(prevTasks => prevTasks.filter(t => t.task !== task));
            setCheckboxStates(prevState => {
              const newCheckboxStates = { ...prevState };
              delete newCheckboxStates[task];
              return newCheckboxStates;
            });
          }
        },
      ],
      { cancelable: false }
    );
  };

  const isSearchEmpty = searchQuery === ''; // Check if search field is empty

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Tasks</Text>
      </SafeAreaView>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      {/* Render filtered tasks in a ScrollView */}
      <ScrollView style={styles.scrollView}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((item, index) => (
            <TaskItem
              key={index}
              task={item.task}
              color={item.color}
              options={item.options}
              checkboxes={checkboxStates[item.task]}
              toggleCheckbox={toggleCheckbox}
              deleteTask={deleteTask}
              isSearchEmpty={isSearchEmpty}
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>No tasks found</Text>
        )}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    backgroundColor: '#ddd',
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
  },
  searchInput: {
    color: '#000',
    textAlign: 'center',
  },
  taskContainer: {
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  task: {
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'light',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 30,
  },
  checkboxText: {
    color: '#01796F',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 45,
    backgroundColor: '#01796F',
    borderRadius: 60,
    padding: 10,
    height: 70,
    width: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  addButtonText: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
});