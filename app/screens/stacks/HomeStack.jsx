import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";
import TaskScreen from "../TaskScreen";
import colors from "../../styles/colors";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="task" component={TaskScreen} 
        options={({ route }) => ({ 
          title: route.params.roomName,
          headerStyle: {
            backgroundColor: colors.bgColor, // Background color
          },
          headerTintColor: colors.black, // Text color
          headerShadowVisible: false,
          // headerTitleStyle: {
          //   fontWeight: 'bold', // Style du texte
          // },
        })} 
      />

    </Stack.Navigator>
  );
};

