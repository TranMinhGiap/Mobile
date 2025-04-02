import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const ClockScreen = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Tính toán góc quay của kim đồng hồ
  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourAngle = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clock</Text>
      <View style={styles.clockContainer}>
        <Svg height="200" width="200" viewBox="0 0 200 200">
          {/* Vòng tròn đồng hồ */}
          <Circle cx="100" cy="100" r="90" stroke="pink" strokeWidth="5" fill="none" />
          {/* Kim giờ */}
          <Line x1="100" y1="100" x2="100" y2="60" stroke="black" strokeWidth="4"
                strokeLinecap="round" transform={`rotate(${hourAngle} 100 100)`} />
          {/* Kim phút */}
          <Line x1="100" y1="100" x2="100" y2="50" stroke="black" strokeWidth="3"
                strokeLinecap="round" transform={`rotate(${minuteAngle} 100 100)`} />
          {/* Kim giây */}
          <Line x1="100" y1="100" x2="100" y2="40" stroke="red" strokeWidth="2"
                strokeLinecap="round" transform={`rotate(${secondAngle} 100 100)`} />
        </Svg>
      </View>
      <Text style={styles.timeText}>{time.toLocaleTimeString()}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Set Clock</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C54',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clockContainer: {
    backgroundColor: 'white',
    borderRadius: 150,
    padding: 10,
  },
  timeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'pink',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 