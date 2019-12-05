import React, { Component } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Icon, Fab, Input } from "native-base";
import { ApplicationStore, Games } from "../../types/store";
import Headers from "../../components/shared/Headers";
import GamesView from "../../components/elements/GamesView";
import { renamePlayer } from "../../redux/player/playerActions";
import { createNewGame } from "../../redux/games/gamesActions";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { styles } from "./styles";

interface HomeScreenProps {
	playerName: string;
	games: Games;
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	createNewGame(id: string): void;
	renamePlayer(newName: string): void;
}

const mapStateToProps = (state: ApplicationStore) => ({
	playerName: state.playerStore.playerName,
	games: state.gamesStore
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {
		renamePlayer: bindActionCreators(renamePlayer, dispatch),
		createNewGame: bindActionCreators(createNewGame, dispatch)
	};
};

class HomeScreen extends Component<HomeScreenProps> {

	private onEndEditing = (e): void => {
		if (e.nativeEvent.text) {
			this.props.renamePlayer(e.nativeEvent.text);
		}
	}

	private navigateToGame = (id: string): void => {
		const { playerName, navigation } = this.props;
		navigation.navigate("Game", { playerName, id });
	}

	private createNewGame = (): void => {
		const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
		this.props.createNewGame(id);

		setTimeout(
			() => {
				this.navigateToGame(id);
			}, 0);
	}

	render(): React.ReactElement {
		const { games, playerName } = this.props;
		return (
			<Container style={styles.container}>
				<Headers />
				<StatusBar barStyle="light-content" />
				<Content style={styles.content}>
					<Input
						style={styles.inputName}
						defaultValue={playerName}
						onEndEditing={this.onEndEditing} />
					<GamesView games={games} playerName={playerName} onPress={(id) => this.navigateToGame(id)}/>
				</Content>
				<Fab
					style={styles.buttonNewGame}
					position="bottomRight"
					onPress={this.createNewGame}>
					<Icon name="add" />
				</Fab>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);