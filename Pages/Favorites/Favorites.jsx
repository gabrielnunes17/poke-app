import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PokeCard from "../../components/PokeCard/PokeCard";

export default function Favorites({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  async function loadFavorites() {
    try {
      const raw = await AsyncStorage.getItem("@favorites");
      const list = raw ? JSON.parse(raw) : [];
      setFavorites(list);
    } catch (e) {
      console.error("Failed to load favorites:", e);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadFavorites();
    });
    loadFavorites();
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>

      {favorites.length === 0 ? (
        <View style={{ padding: 16 }}>
          <Text>Nenhum favorito ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PokeCard
              id={item.id}
              name={item.name}
              image={item.image}
              type={item.type}
              onToggle={() => loadFavorites()}
            />
          )}
        />
      )}
    </View>
  );
}
