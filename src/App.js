import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Pages/Home/Home";
import Favorites from "../Pages/Favorites/Favorites";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#d32f2f" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold"},
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Pokédex" }}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={{ title: "Favorites" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
