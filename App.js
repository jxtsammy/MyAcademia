import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './components/SignInOptions/WelcomeScreen'
import Login from './components/SignInOptions/Login'
import SignUp from './components/SignInOptions/SignUp'
import OPTVerification from './components/SignInOptions/OTPCode'
import EnterMail from './components/ForgotPassword/EnterMail'
import EmailVerification from './components/ForgotPassword/EmailVerificationCode'
import SetNewPassword from './components/ForgotPassword/SetNewPassword'
import Timetable from './components/Timetable&Schedules/Timetable'
import ScheduleForm from './components/Timetable&Schedules/ScheduleForm'
import AddTask from './components/TaskPlanner/AddTasks'
import Tasks from './components/TaskPlanner/AddTasks';
import CWACalculator from './components/AvgCalculator/AverageCalculator'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          headerShown: false, // Show header
        }}>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OPTVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EnterMail"
          component={EnterMail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="SetNewPassword"
          component={SetNewPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TimeTable"
          component={Timetable}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScheduleForms"
          component={ScheduleForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Task"
          component={Tasks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTask}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CWACalculator"
          component={CWACalculator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
