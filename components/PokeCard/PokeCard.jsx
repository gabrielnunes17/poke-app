import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import styles from "./PokeCardStyles";

export default function PokeCard({ name, image, type }) {
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
    </Card>
  );
}
