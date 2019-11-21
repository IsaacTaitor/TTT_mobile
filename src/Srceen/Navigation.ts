import { createAppContainer } from 'react-navigation';
import { HomeScreen } from './HomeScreen';
import { createStackNavigator } from 'react-navigation-stack';

const stackNavigationConfig: { [key: string]: any } = {
	headerMode: 'none'
};

const MainNavigator = createStackNavigator({
	Home: { screen: HomeScreen },
}, stackNavigationConfig);

const AppNavigator = createAppContainer(MainNavigator);

export default AppNavigator;