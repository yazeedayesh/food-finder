import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";
 
const ResultsShowScreen = ({ route }) => {
  const [result, setResult] = useState(null);
  const id = route.params.id;
 
  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };
  useEffect(() => {
    getResult(id);
  }, []);
 
  if (!result) {
    return null;
  }
 
  return (
    <View>
        <Text style={styles.title}>{result.name}</Text>
        {result.photos && result.photos.length > 0 ? (
            <FlatList
                data={result.photos}
                keyExtractor={(photo) => photo}
                renderItem={({ item }) => {
                    return <Image style={styles.image} source={{ uri: item }} />;
                }}
            />
        ) : (
            result.image_url ? (
                <Image style={styles.image} source={{ uri: result.image_url }} />
            ) : (
                <Text>No Images Available</Text>
            )
        )}
    </View>
);
};

const styles = StyleSheet.create({
title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
},
image: {
    height: 200,
    width: 300,
    marginBottom: 10,
    borderRadius: 5
}
});

export default ResultsShowScreen;