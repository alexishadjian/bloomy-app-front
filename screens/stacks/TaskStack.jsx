import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskScreen from "../TaskScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tâches" component={TaskScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
