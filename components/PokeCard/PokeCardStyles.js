import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cover: {
    height: 150, // OBRIGATÓRIO: Sem altura definida a imagem não aparece!
    backgroundColor: "#f5f5f5",
  },
  title: {
    textTransform: "capitalize",
  },
});

export default styles;
