import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

const CustomDrawer = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedTranslateX = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  const drawerItemsOpacity = useRef(new Animated.Value(0)).current; // Opacity for drawer items

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedScale, {
        toValue: drawerOpen ? 0.83 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedTranslateX, {
        toValue: drawerOpen ? width * 0.7 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animatedOpacity, {
        toValue: drawerOpen ? 0.7 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(drawerItemsOpacity, {
        toValue: drawerOpen ? 1 : 0, // Fade in/out drawer items
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [drawerOpen, animatedOpacity, animatedScale, animatedTranslateX, drawerItemsOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={drawerOpen ? "light-content" : "dark-content"} />

      {/* Drawer Content */}
      <Animated.View style={[styles.drawer, { opacity: drawerItemsOpacity }]}>
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/A.png')} // Replace with your profile picture URL
            style={styles.drawerProfilePicture}
          />
          <Text style={styles.profileName}>Sallo Samuel</Text>
          <Text style={styles.profileSubtext}>jxtsammy@gmail.com</Text>
        </View>

        <View style={styles.drawerItems}>
          <DrawerItem
            label="Home"
            icon={() => <Icon name="home" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('Home')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="My Account"
            icon={() => <Icon name="user" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('EditProfile')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="Notifications"
            icon={() => <Icon name="bell" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('Address')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="Special Offers"
            icon={() => <Icon name="tag" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('Address')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="History"
            icon={() => <Icon name="history" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('History')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="Complain"
            icon={() => <Icon name="exclamation-circle" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('Complain')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="Referral"
            icon={() => <Icon name="share-alt" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('Referral')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="About Us"
            icon={() => <Icon name="info-circle" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('AboutUs')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="Help and Support"
            icon={() => <Icon name="question-circle" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('HelpAndSupport')}
            labelStyle={styles.labelStyle}
          />
          <DrawerItem
            label="Logout"
            icon={() => <Icon name="sign-out" size={24} color="#fff" />}
            onPress={() => props.navigation.navigate('Logout')}
            labelStyle={styles.labelStyle}
          />
        </View>
      </Animated.View>

      {/* Current Screen */}
      <Animated.View
        style={[
          styles.currentScreen,
          {
            transform: [{ scale: animatedScale }, { translateX: animatedTranslateX }],
            opacity: animatedOpacity,
          },
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={() => setDrawerOpen(false)}
        >
          {/* Current Screen Content */}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const DrawerItem = ({ icon, label, onPress, labelStyle }) => (
  <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
    {icon()}
    <Text style={[styles.drawerText, labelStyle]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01796F',
  },
  drawer: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    width: width * 0.95, // Width of the drawer
    alignItems: 'flex-start',
    padding: 20,
  },
  profileSection: {
    marginBottom: 30,
    alignItems: 'flex-start',
    left: 0,
    marginTop: 50,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileSubtext: {
    color: 'white',
    fontSize: 16,
    marginTop: 5,
  },
  drawerItems: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  drawerText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  currentScreen: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    borderRadius: 30,
  },
  drawerProfilePicture: {
    width: 75,
    height: 75,
    borderRadius: 40,
    alignItems: 'flex-start',
  },
});

export default CustomDrawer;