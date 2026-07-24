import React, { useEffect, useState } from "react";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import styles from "./PokeCardStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function toggleFavoriteItem(item) {
  try {
    const raw = await AsyncStorage.getItem("@favorites");
    const list = raw ? JSON.parse(raw) : [];
    const exists = list.some((p) => p.id === item.id);
    let newList;
    if (exists) {
      newList = list.filter((p) => p.id !== item.id);
    } else {
      newList = [...list, item];
    }
    await AsyncStorage.setItem("@favorites", JSON.stringify(newList));
    return !exists;
  } catch (e) {
    console.error("Failed to toggle favorite:", e);
    return null;
  }
}

export default function PokeCard({ id, name, image, type, onToggle }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const raw = await AsyncStorage.getItem("@favorites");
        const list = raw ? JSON.parse(raw) : [];
        const exists = list.some((p) => p.id === id);
        if (mounted) setFavorited(exists);
      } catch (e) {
        console.error("Failed to check favorite:", e);
      }
    }
    check();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleFavorite = async () => {
    const item = { id, name, image, type };
    const result = await toggleFavoriteItem(item);
    if (result !== null) {
      setFavorited(result);
      if (typeof onToggle === "function") onToggle(result);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: image }}
        style={styles.cover}
        resizeMode="contain"
      />

      <Card.Content>
        <Title style={styles.title}>{name}</Title>
        <Paragraph>Type: {type}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon={favorited ? "star" : "star-outline"}
          iconColor={favorited ? "#ffd700" : undefined}
          onPress={handleFavorite}
        />
      </Card.Actions>
    </Card>
  );
}
