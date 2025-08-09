import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text } from "react-native";
import { SplashScreen } from "./app/screens/SplashScreen";
import { LoginScreen } from "./app/screens/auth/LoginScreen";
import { RegisterScreen } from "./app/screens/auth/RegisterScreen";
import { HomeScreen } from "./app/screens/HomeScreen";
import { ReconnectScreen } from "./app/screens/main/ReconnectScreen";
import { WallScreen } from "./app/screens/main/WallScreen";
import { ProfileScreen } from "./app/screens/main/ProfileScreen";
import { ReflectionScreen } from "./app/screens/main/ReflectionScreen";
import { ThemeProvider, useTheme } from "./app/theme/ThemeContext";

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  Reflection: {
    selectedMood: {
      emoji: string;
      label: string;
    };
  };
};

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabs() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: "rgba(255, 255, 255, 0.05)",
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <Tab.Screen
        name="RealityAnchor"
        component={HomeScreen}
        options={{
          tabBarLabel: "Reality",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>☀️</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Reconnect"
        component={ReconnectScreen}
        options={{
          tabBarLabel: "Reconnect",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>🔄</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Wall"
        component={WallScreen}
        options={{
          tabBarLabel: "Wall",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>🌊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 24, opacity: focused ? 1 : 0.5 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Reflection"
          component={ReflectionScreen}
          options={{
            headerShown: true,
            headerTitle: "Reflect on your feelings",
            headerStyle: {
              backgroundColor: colors.accent,
            },
            headerTintColor: "#fff",
            headerBackTitle: "Back",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
      <StatusBar style="light" backgroundColor={colors.accent} />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
