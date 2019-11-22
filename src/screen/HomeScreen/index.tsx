import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Icon, Fab, Input, Text, View } from "native-base";
import { ApplicationStore, Games } from "../../types/store";
import Headers from "../../components/Headers";
import GameSquare from "../../components/GameSquare";
import { styles } from "./styles";
import { renamePlayer } from "../../redux/player/playerActions";
import { createNewGame } from "../../redux/games/gamesActions";

interface HomeScreenProps {
	playerName: string;
	games: Games;
	navigation: any;
	createNewGame(id: string): void;
	renamePlayer(newName: string): void;
}

const mapStateToProps = (state: ApplicationStore): any => ({
	playerName: state.playerStore.playerName,
	games: state.gamesStore
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): any => {
	return {
		renamePlayer: bindActionCreators(renamePlayer, dispatch),
		createNewGame: bindActionCreators(createNewGame, dispatch)
	};
};


class HomeScreen extends Component<HomeScreenProps> {

	onEndEditing = (e) => {
		this.props.renamePlayer(e.nativeEvent.text);
	}

	createNewGame = () => {
		const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
		this.props.createNewGame(id);
		this.props.navigation.navigate("Game", { id });
	}

	render(): React.ReactElement {
		return (
			<Container style={styles.container}>
				<Headers />
				<Content style={styles.content}>
					<Input
						style={styles.inputName}
						defaultValue={this.props.playerName}
						onEndEditing={this.onEndEditing} />
					<View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
						{
							Object.keys(this.props.games).map((id, key) =>
								<GameSquare key={id} opponent={this.props.games[id].opponent}/>
							)
						}
					</View>
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