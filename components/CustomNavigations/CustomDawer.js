import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground, Animated, Easing, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const CustomDrawer = ({ isDrawerOpen, onClose, onOpen }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [localDrawerOpen, setLocalDrawerOpen] = useState(isDrawerOpen);
  const pinchRef = useRef(null);

  useEffect(() => {
    setLocalDrawerOpen(isDrawerOpen);
  }, [isDrawerOpen]);

  useEffect(() => {
    if (localDrawerOpen) {
      // Open animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.bezier(0.4, 0, 0.5, 1),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 35,
          velocity: 0.2,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Close animation
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.7,
          friction: 8,
          tension: 30,
          velocity: 0.2,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [localDrawerOpen, slideAnim, scaleAnim]);

  const interpolatedSlide = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, 0]
  });

  const onPinchGestureEvent = (event) => {
    const { numberOfPointers, scale } = event.nativeEvent;

    // Check if it's a pinch-in gesture with two fingers
    if (numberOfPointers === 2 && scale < 1 && !localDrawerOpen) {
      setLocalDrawerOpen(true);
      onOpen && onOpen();
    }
  };

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      // Optional: Add any additional logic for pinch end
    }
  };

  return (
    <PanGestureHandler
      ref={pinchRef}
      onGestureEvent={onPinchGestureEvent}
      onHandlerStateChange={onPinchHandlerStateChange}
    >
      <View style={styles.fullScreenDrawer}>
        {localDrawerOpen && (
          <Animated.View
            style={[
              styles.animatedDrawerContainer,
              {
                transform: [
                  { translateX: interpolatedSlide },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            <ImageBackground
              source={require('../../assets/HomeBg.jpg')}
              style={styles.drawerContent}
              imageStyle={styles.backgroundImage}
            >
              <StatusBar barStyle="light-content" backgroundColor="#000" />

              <View style={styles.overlayContainer}>
                {/* Close button at the top right */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setLocalDrawerOpen(false);
                    onClose && onClose();
                  }}
                >
                  <Feather name="x" size={24} color="#fff" />
                </TouchableOpacity>

                <View style={styles.drawerHeader}>
                  <View style={styles.profileContainer}>
                    <Image
                      source={require('../../assets/okarun.jpg')}
                      style={styles.profileImage}
                    />
                    <Text style={styles.profileText}>Sallo Samuel</Text>
                    <Text style={styles.profileEmail}>robertflames001@gmail.com</Text>
                  </View>
                </View>
                <View style={styles.drawerOptions}>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="home" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="calendar" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>Schedules</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="check-square" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>Tasks</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="grid" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>CWA Calculator</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="message-circle" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>Chat ACE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="bell" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>Notification</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="user" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerOption}>
                    <Feather name="log-out" size={24} color="#fff" />
                    <Text style={styles.drawerOptionText}>Log Out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </Animated.View>
        )}
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  fullScreenDrawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height,
    borderRadius: 20
  },
  animatedDrawerContainer: {
    width: '100%',
    height: '100%',
  },
  drawerContent: {
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  drawerHeader: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 18,
    color: '#fff',
  },
  drawerOptions: {
    gap: 16,
  },
  drawerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  drawerOptionText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CustomDrawer;