import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native';
import { Bell, Menu } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.88;

// Task Card Component
const TaskCard = ({ title, tasks, completion, color }) => (
  <TouchableOpacity style={[styles.taskCard, { backgroundColor: color }]}>
    <View style={styles.taskCardContent}>
      <View style={styles.taskCardLeft}>
        <Text style={styles.taskCardTitle}>{title}</Text>
        <Text style={styles.taskCount}>+{tasks} tasks</Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${completion}%` }]} />
        </View>
        <Text style={styles.completionText}>{completion}% Completed</Text>
      </View>
      <View style={styles.taskCardRight}>
        <Image
          source={require('../../assets/taskIllustration.png')}
          style={styles.taskIllustration}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const dashboardMoveAnimation = useRef(new Animated.Value(0)).current;

  const taskCards = [
    { title: 'Work', tasks: 3, completion: 60, color: '#00B074' },
    { title: 'Study', tasks: 5, completion: 45, color: '#FFA500' },
    { title: 'Personal', tasks: 2, completion: 80, color: '#4169E1' },
    { title: 'Coding', tasks: 8, completion: 30, color: '#088a6a' }
  ];

  const toggleImageExpand = () => {
    const toValue = isImageExpanded ? 0 : 1;
    Animated.timing(dashboardMoveAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setIsImageExpanded(!isImageExpanded);
    });
  };

  // Reset dashboard to original position
  const resetDashboardPosition = () => {
    if (isImageExpanded) {
      Animated.timing(dashboardMoveAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setIsImageExpanded(false);
      });
    }
  };

  // Render Task Content
  const renderTaskContent = () => {
    return (
      <View style={[styles.taskContent, { height: height - 400 }]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.verticalCardContainer}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          nestedScrollEnabled={true}
        >
          {taskCards.map((card, index) => (
            <TaskCard key={index} {...card} />
          ))}
        </ScrollView>
      </View>
    );
  };

  // Render Timetable Content
  const renderTimetableContent = () => {
    const totalCompletion = taskCards.reduce((acc, card) => acc + card.completion, 0) / taskCards.length;

    return (
      <View style={styles.timetableContent}>
        {/* Next Class Card */}
        <TouchableOpacity style={styles.classCard}>
          <View style={styles.classContent}>
            <Text style={styles.classTitle}>Next Class</Text>
            <Text style={styles.classTime}>Fri 8 Nov, 12:30PM</Text>
            <Text style={styles.classDetails}>Subject: Numerical Analysis</Text>
            <Text style={styles.classDetails}>Location: COS 9F11</Text>
           <View style={styles.calender}>
              <Image
                source={require('../../assets/calendarIcon.png')}
                style={styles.calendarImage}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Overall Progress */}
        <View style={styles.overallProgressContainer}>
          <View style={styles.overallProgressHeader}>
            <Text style={styles.overallProgressTitle}>Tasks Completed</Text>
            <Text style={styles.overallProgressPercentage}>{Math.round(totalCompletion)}%</Text>
          </View>
          <View style={styles.overallProgressBarContainer}>
            <View style={[styles.overallProgressBar, { width: `${totalCompletion}%` }]} />
          </View>
        </View>

        {/* Tools Container */}
        <View style={styles.toolsContainer}>
          <TouchableOpacity style={styles.tool}>
            <View style={styles.toolContent}>
              <Image
                source={require('../../assets/calculatoeIcon.png')}
                style={styles.toolIcon}
              />
              <Text style={styles.toolText}>CWA Target Tool</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tool, styles.chatbotTool]}>
            <View style={styles.toolContent}>
              <Image
                source={require('../../assets/botIcon.png')}
                style={styles.toolIcon}
              />
              <Text style={styles.toolText}>Ace Chatbot</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.profileContainer}>
            <Image
              source={require('../../assets/okarun.jpg')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        <View style={styles.headerIcons}>
          <Bell color="#01796f" size={26} style={styles.icon} />
          <Menu color="#01796f" size={26} style={styles.icon} />
        </View>
      </View>

      {/* Quote Section */}
      <TouchableOpacity
        style={styles.quoteContainer}
        onPress={toggleImageExpand}
      >
        <Image
          source={require('../../assets/motivate.jpg')}
          style={styles.quoteBackground}
        />
      </TouchableOpacity>

      {/* Dashboard Container with TouchableWithoutFeedback added */}
      <TouchableWithoutFeedback onPress={resetDashboardPosition}>
        <Animated.View
          style={[
            styles.dashboardContainer,
            {
              transform: [
                {
                  translateY: dashboardMoveAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, height - 690]
                  })
                }
              ]
            }
          ]}
        >
          {/* Dashboard Title */}
          <Text style={styles.dashboardTitle}>Dashboard</Text>

          {/* Tabs */}
          <View style={styles.tabOuterContainer}>
            <View style={styles.tabBackground}>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Overview' && styles.activeTab]}
                onPress={() => setActiveTab('Overview')}
              >
                <Text style={[styles.tabText, activeTab === 'Overview' && styles.activeTabText]}>
                  Overview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, activeTab === 'Task' && styles.activeTab]}
                onPress={() => setActiveTab('Task')}
              >
                <Text style={[styles.tabText, activeTab === 'Task' && styles.activeTabText]}>
                  Task
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Content Area */}
          <View style={styles.content}>
            {activeTab === 'Overview' ? renderTimetableContent() : renderTaskContent()}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  quoteContainer: {
    height: 150,
    justifyContent: 'center',
    position: 'relative',
  },
  quoteBackground: {
    width: "100%",
    height: 350,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    width: '100%',
    top: 290,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  tabOuterContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tabBackground: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    padding: 4,
    width: '80%',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 30,
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 18,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  taskContent: {
    flex: 1,
  },
  verticalCardContainer: {
    flexDirection: 'column',
    gap: 16,
    paddingBottom: 40,
  },
  taskCard: {
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 20,
    height: 160,
  },
  taskCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  taskCardLeft: {
    flex: 1,
  },
  taskCardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12
  },
  taskCount: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  completionText: {
    fontSize: 14,
    color: '#fff',
  },
  taskCardRight: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  taskIllustration: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  timetableContent: {
    gap: 12,
  },
  classCard: {
    backgroundColor: '#00B074',
    borderRadius: 16,
    padding: 20,
    marginBottom: 5,
  },
  classContent: {
    position: 'relative',
  },
  classTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  classTime: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  classDetails: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  calender: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
  },
  calendarImage: {
    width: 130,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 20
  },
  overallProgressContainer: {
    padding: 20,
    backgroundColor: 'crimson',
    borderRadius: 16,
    paddingVertical: 35,
    marginTop: 2,
  },
  overallProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallProgressTitle: {
    fontSize: 24,
    fontWeight: 'light',
    color: '#fff',
  },
  overallProgressPercentage: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  overallProgressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  overallProgressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  toolsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginTop: 5,
    marginBottom: 40
  },
  tool: {
    backgroundColor: '#01796f',
    borderRadius: 16,
    padding: 10,
    flex: 1,
    minWidth: '40%',
  },
  toolContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  chatbotTool: {
    backgroundColor: '#FFA500',
  },
  toolText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Dashboard;