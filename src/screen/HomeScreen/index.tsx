import React, { Component } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Icon, Fab, Input, View } from "native-base";
import { ApplicationStore, Games } from "../../types/store";
import Headers from "../../components/shared/Headers";
import GameSquare from "../../components/shared/GameSquare";
import { styles } from "./styles";
import { renamePlayer } from "../../redux/player/playerActions";
import { createNewGame } from "../../redux/games/gamesActions";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

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

	private viewGames = (games): React.ReactElement => {
		return <View style={styles.games}>
			{Object.keys(this.props.games).map((id, key) =>
				<GameSquare
					onPress={(): void => this.navigateToGame(id)}
					key={id}
					time={games[id].time}
					opponent={games[id].opponent}
					playerName={this.props.playerName}
					status={games[id].status}
					isLast={!((key + 1) % 4)} />
			)}
		</View>;
	}

	render(): React.ReactElement {
		return (
			<Container style={styles.container}>
				<Headers />
				<StatusBar barStyle="light-content" />
				<Content style={styles.content}>
					<Input
						style={styles.inputName}
						defaultValue={this.props.playerName}
						onEndEditing={this.onEndEditing} />
					{this.viewGames(this.props.games)}
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