import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { PaperProvider, Appbar, ActivityIndicator } from "react-native-paper";

import { getPokemons } from "../services/pokeApi";
import PokeCard from "../components/PokeCard/PokeCard";
import styles from "./styles";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const lista = await getPokemons(151);
        setPokemons(lista);
      } catch (error) {
        console.error("Erro ao carregar Pokémons:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, []);

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#d32f2f" }}>
        <Appbar.Content
          title="Pokédex"
          titleStyle={{ fontWeight: 900, color: "#fff" }}
          style={{ alignItems: "center" }}
        />
      </Appbar.Header>

      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={pokemons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PokeCard name={item.name} image={item.image} type={item.type} />
            )}
          />
        )}
      </View>
    </PaperProvider>
  );
}
