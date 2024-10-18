import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Ensure this package is installed

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ScheduleForm = ({ isVisible, onClose, onSave }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [subject, setSubject] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));

  const handleSave = () => {
    const schedules = selectedDays.map((isSelected, index) => {
      if (isSelected) {
        return {
          id: Date.now().toString(), // Unique ID for the schedule
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format the time
          subject,
          location,
          date: startDate.getDate(), // Get start date
          month: startDate.getMonth() + 1, // Get month (1-12)
          day: daysOfWeek[index],
        };
      }
      return null;
    }).filter(schedule => schedule !== null); // Filter out null values

    onSave(schedules);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setTime(new Date());
    setSubject('');
    setLocation('');
    setSelectedDays(new Array(7).fill(false));
  };

  const toggleDaySelection = (index) => {
    setSelectedDays(prev => {
      const newDays = [...prev];
      newDays[index] = !newDays[index];
      return newDays;
    });
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'set') {
      setShowTimePicker(false);
      setTime(selectedTime || time);
    } else {
      setShowTimePicker(false);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.formContainer}>
        <Text style={styles.header}>Create Schedule</Text>

        {/* Days of the Week */}
        <Text style={styles.label}>Select Days:</Text>
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayCircle,
                selectedDays[index] ? styles.selectedDay : styles.unselectedDay,
              ]}
              onPress={() => toggleDaySelection(index)}
            >
              <Text style={styles.dayText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Start Date */}
        <Text style={styles.label}>Start Date:</Text>
        <TouchableOpacity style={styles.inputField} onPress={() => setStartDate(new Date())}>
          <Text style={styles.inputText}>{startDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => setStartDate(date || startDate)}
        />

        {/* End Date */}
        <Text style={styles.label}>End Date:</Text>
        <TouchableOpacity style={styles.inputField} onPress={() => setEndDate(new Date())}>
          <Text style={styles.inputText}>{endDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, date) => setEndDate(date || endDate)}
        />

        {/* Time Picker */}
        <Text style={styles.label}>Time:</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timeInput}>
          <Text style={styles.timeText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* Subject Input */}
        <Text style={styles.label}>Subject:</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Enter subject"
        />

        {/* Location Input */}
        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 16,
    color: '#555',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 16,
    color: '#555',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    elevation: 2, // Adds shadow for elevation
  },
  selectedDay: {
    backgroundColor: '#01796F', // Green for selected days
  },
  unselectedDay: {
    backgroundColor: '#ccc', // Gray for unselected days
  },
  dayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#01796F', // Green background for save button
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#FF3E30', // Red background for cancel button
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScheduleForm;