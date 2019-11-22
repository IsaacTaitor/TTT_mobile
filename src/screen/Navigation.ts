import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./HomeScreen";
import GameScreen from "./GameScreen";

const stackNavigationConfig: { [key: string]: string } = {
	headerMode: "none"
};

const MainNavigator = createStackNavigator({
	Home: { screen: HomeScreen },
	Game: { screen: GameScreen }
}, stackNavigationConfig);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;