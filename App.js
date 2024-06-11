import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { AuthProvider, AuthContext, useAuth } from "./app/context/AuthContext";
import SvgIcon from "./app/components/SvgIcon";
import { Button } from "react-native";
import colors from "./app/styles/colors";

import HomeStack from "./app/screens/stacks/HomeStack";
import TaskStack from "./app/screens/stacks/TaskStack";
import AuthStack from "./app/screens/stacks/AuthStack";
import CreateHomeStack from "./app/screens/stacks/CreateHomeStack";


const Tab = createBottomTabNavigator();

export default function App() {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
        ...DefaultTheme.colors,
        background: colors.bgColor,
        },
    };

    return (
        <AuthProvider>
            <NavigationContainer theme={MyTheme}>
                <MainNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
}

function MainNavigator() {
    const { authState, homeId } = useAuth();

    console.log('appjs homeid', homeId);
    console.log('appjs authstatee', authState);
    if (authState?.authenticated) {
        return homeId?.exist ? <AuthenticatedApp /> : <CreateHomeStack />;
    } else {
        return <AuthStack />;
    }
}

export function AuthenticatedApp() {

    const { onLogout, authState, homeId } = useAuth();



    return (
        // <NavigationContainer theme={MyTheme}>
        // <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                tabBarIcon : ({focused, color, size}) => {

                    let name = 'asterisk';

                    if (route.name === "home") name = "home";
                    else if (route.name === "task") name = "task";

                    return <SvgIcon name={name} color={color} />
                },
                tabBarActiveTintColor: "#9261F2",
                tabBarInactiveTintColor: "#000000"
                })}
            >
                <Tab.Screen name="home" component={HomeStack}
                    options={({route}) => ({
                        title: 'Accueil',
                        headerStyle: {
                            backgroundColor: "#9261F2"
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: "#fff"
                        },
                        headerRight: () => (
                            <Button onPress={onLogout} title="Déconnexion" />
                        ),
                    })}
                />
                <Tab.Screen name="task" component={TaskStack}
                    options={({route}) => ({
                        title: 'Tâches',
                        headerStyle: {
                            backgroundColor: "#9261F2"
                        },
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            color: "#fff"
                        },
                    })}
                />
            </Tab.Navigator>
        // </NavigationContainer>
    );
}