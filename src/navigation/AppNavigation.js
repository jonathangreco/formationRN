
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import MainScreen from "../screens/MainScreen";


const AppNavigator =  createStackNavigator(
  {
    HomeScreen: HomeScreen,
    MainScreen: MainScreen,
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);