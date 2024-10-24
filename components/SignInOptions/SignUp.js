import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpScreen = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (input) => {
    setPassword(input);
    if (input.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Image
                source={require('../../assets/welcomeimg.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>
              Register and get access to features to enhance your academic work
            </Text>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#999" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />

            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                secureTextEntry={!isPasswordVisible}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={validatePassword}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
                <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('OTPVerification')}>
            <Text style={styles.createAccountText}>Create Account</Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText} >
            Do you have an account? <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.signInText}>Sign In</Text></TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 450,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    padding: 20,
    marginBottom: 5,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#01796F',
    marginBottom:5
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    paddingHorizontal: 15,
    fontSize: 14,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 14,
    color: '#333',
    elevation: 1,
    borderWidth: 1,
    borderColor: '#01796F'
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#01796F',
    paddingVertical: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  createAccountButton: {
    backgroundColor: '#01796F',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
    fontSize: 14,
  },
  signInText: {
    color: '#01796F',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;