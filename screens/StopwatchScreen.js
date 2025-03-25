import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function StopwatchScreen() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime(prev => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps([...laps, formatTime()]);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.time}>{formatTime()}</Text>
      </View>
      <FlatList
        data={laps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.lapContainer}>
            <Text style={styles.lapText}>Lap {index + 1}</Text>
            <Text style={styles.lapTime}>{item}</Text>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLap} disabled={!running}>
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setRunning(!running)}>
          <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  circle: { alignItems: 'center', marginVertical: 20, borderWidth: 5, borderColor: '#FF5555', borderRadius: 150, width: 300, height: 300, justifyContent: 'center', alignSelf: 'center' },
  time: { fontSize: 40, fontWeight: 'bold' },
  lapContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  lapText: { fontSize: 18 },
  lapTime: { fontSize: 18, fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  button: { backgroundColor: '#FF5555', padding: 15, borderRadius: 30 },
  buttonText: { color: '#fff', fontSize: 16 },
});