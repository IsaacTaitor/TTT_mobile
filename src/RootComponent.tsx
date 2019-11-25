import React, { Component } from "react";
import { Root } from "native-base";
import AppNavigator from "./screen/Navigation";
import * as Font from "expo-font";

interface RootComponentState {
	isLoaded: boolean;
}

class RootComponent extends Component<{}, RootComponentState> {

	state: RootComponentState = { isLoaded: false };

	async componentDidMount() {
		console.disableYellowBox = true;
		await Font.loadAsync({
			"Roboto": require("../node_modules/native-base/Fonts/Roboto.ttf"),
			"Roboto_medium": require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
		});
		this.setState({ isLoaded: true });
	}

	render(): React.ReactElement {
		return (
			this.state.isLoaded &&
			<Root>
				<AppNavigator />
			</Root>
		);
	}
}

export default RootComponent;