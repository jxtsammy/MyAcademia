import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({navigation}) => {

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.nav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.navText}>←</Text>
          </TouchableOpacity>
        </View>
      <View style={styles.container}>
        <Image
          source={require('../../assets/ForgotPassword.png')} // Replace with your image path
          style={styles.image}
        />
        <Text style={styles.forgotText}>Forgot Password</Text>

        <Text style={styles.subtitle}>
          Enter an email associated with your account for verification code
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
    placeholderTextColor="#888"
            style={styles.input}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.ContinueButton}>
          <Text style={styles.ContinueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nav: {
    flexDirection: 'row',
    left: 10,
  },
  navText: {
    fontSize: 30,
    fontWeight: '600',
    marginRight: 10,
  },
  container: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 550,
    height: 310,
    marginBottom: 30,
    resizeMode: 'contain',
    top: -50

  },
  forgotText: {
    fontSize: 35,
    fontWeight: '300',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 40,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  ContinueButton: {
    width: '100%',
    backgroundColor: '#1C6559',
    paddingVertical: 17,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  ContinueButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;