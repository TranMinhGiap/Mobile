import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

export default function DetailScreen({ route }) {
  const { movie } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.description}>{movie.overview}</Text>
      <Text style={styles.releaseDate}>🗓 Ngày phát hành: {movie.release_date}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },
  poster: { width: 250, height: 350, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10, textAlign: "center" },
  description: { fontSize: 16, textAlign: "center", marginTop: 10, paddingHorizontal: 10 },
  releaseDate: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "gray" },
});
