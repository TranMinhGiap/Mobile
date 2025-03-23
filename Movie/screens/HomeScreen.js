import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1";

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi lấy danh sách phim:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Detail", { movie: item })}>
              <View style={styles.movieItem}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.poster} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  movieItem: { marginBottom: 20, alignItems: "center" },
  poster: { width: 150, height: 200, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold", marginTop: 5, textAlign: "center" },
});
