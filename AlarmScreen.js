import React, { useState } from 'react';
import { View, Text, Switch, FlatList, StyleSheet } from 'react-native';

const initialAlarms = [
  { id: '1', time: '07:00', label: 'Wake up!', enabled: true },
  { id: '2', time: '07:15', label: 'Now ready wake up!', enabled: false },
  { id: '3', time: '08:00', label: 'Never mind', enabled: true },
];

export default function AlarmScreen() {
  const [alarms, setAlarms] = useState(initialAlarms);

  const toggleSwitch = (id) => {
    setAlarms(alarms.map(alarm => 
      alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
    ));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmContainer}>
            <View>
              <Text style={styles.time}>{item.time}</Text>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={() => toggleSwitch(item.id)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={item.enabled ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>Add Alarm</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  alarmContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  time: { fontSize: 30, fontWeight: 'bold' },
  label: { fontSize: 16, color: 'gray' },
  buttonContainer: { alignItems: 'center', marginTop: 20 },
  button: { backgroundColor: '#81b0ff', color: '#fff', padding: 10, borderRadius: 20, fontSize: 16 },
});