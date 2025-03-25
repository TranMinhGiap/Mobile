import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TimerScreen() {
  const [time, setTime] = useState(15 * 60 * 1000); // 15 minutes
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => setTime(prev => prev - 1000), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setRunning(false);
    setTime(15 * 60 * 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.time}>{formatTime()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setRunning(!running)}>
          <Text style={styles.buttonText}>{running ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  circle: { alignItems: 'center', marginVertical: 20, borderWidth: 5, borderColor: '#81b0ff', borderRadius: 150, width: 300, height: 300, justifyContent: 'center', alignSelf: 'center' },
  time: { fontSize: 40, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  button: { backgroundColor: '#81b0ff', padding: 15, borderRadius: 30 },
  buttonText: { color: '#fff', fontSize: 16 },
});