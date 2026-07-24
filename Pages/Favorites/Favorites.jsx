import { View, Text, Button } from "react-native";

export default function Favorites({ navigation }) {
  return (
    <View>
      <Button title="Voltar" onPress={() => navigation.goBack()}/>
    </View>
  );
}
