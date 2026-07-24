import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import {
  PaperProvider,
  Appbar,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import { getPokemons } from "../../services/pokeApi";
import PokeCard from "../../components/PokeCard/PokeCard";
import styles from "./HomeStyles";

export default function Home({ navigation }) {
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
      <Button
        onPress={() => navigation.navigate("Favorites")}
        icon="star"
        textColor="#414141"
        style={{ margin: 10, width: 200, alignSelf: "center" }}
        labelStyle={{ fontSize: 18 }}
      >
        Favorites
      </Button>

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
              <PokeCard
                id={item.id}
                name={item.name}
                image={item.image}
                type={item.type}
              />
            )}
          />
        )}
      </View>
    </PaperProvider>
  );
}
