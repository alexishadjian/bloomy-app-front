import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import SvgIcon from "./components/SvgIcon";
// import Header from "./components/Header";
// import HomeStack from "./screens/Stacks/HomeStack";
// import LeagueStack from "./screens/Stacks/LeagueStack";
// import ProfileStack from "./screens/Stacks/ProfileStack";
// import RaceStack from "./screens/Stacks/RaceStack";

import HomeStack from "./screens/stacks/HomeStack";
import TaskStack from "./screens/stacks/TaskStack";


const Tab = createBottomTabNavigator();

export default function App() {
const MyTheme = {
    ...DefaultTheme,
    colors: {
    ...DefaultTheme.colors,
    background: "#F5F5F5",
    },
};

return (
    <NavigationContainer theme={MyTheme}>
    {/* <Header /> */}
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon : ({focused, color, size}) => {

            console.log('route', route);
            let name = 'asterisk';

            if (route.name === "Accueil") name = "home";
            else if (route.name === "Tâches") name = "task";

            return <SvgIcon name={name} color={color} />
          },
          tabBarActiveTintColor: "#9261F2",
          tabBarInactiveTintColor: "#000000"
        })}
    >
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Tâches" component={TaskStack} />
    </Tab.Navigator>
    </NavigationContainer>
);
}