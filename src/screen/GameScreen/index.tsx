import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Text, Icon, View } from "native-base";
import Headers from "../../components/shared/Headers";
import GameField from "../../components/elements/GameField";
import { Game, Games, ApplicationStore, StateStatus, StateTurn } from "../../types/store";
import { styles } from "./styles";
import { turnAI } from "../../utils";

import { editField } from "../../redux/games/gamesActions";

interface GameScreenProps {
	navigation: any;
	games: Games;
	editField(id: string, turn: StateTurn, coordinates: { x: number; y: number }): Function;
}

const mapStateToProps = (state: ApplicationStore): any => ({
	games: state.gamesStore
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): any => {
	return {
		editField: bindActionCreators(editField, dispatch)
	};
};

class GameScreen extends Component<GameScreenProps> {

	componentDidUpdate(): void {
		const { id } = this.props.navigation.state.params;
		const { games, editField } = this.props;
		if (games[id].turn === StateTurn.AI) {
			setTimeout(() => turnAI(id, games[id].field, editField), 0);
		}
	}

	private viewScoreboard = (playerName: string, game: Game): React.ReactElement => {
		return (
			<View style={styles.scoreBoard}>
				<View style={[styles.player, game.turn === StateTurn.PLAYER ? { borderBottomWidth: 3 } : null]}>
					<Text>{playerName}</Text>
					<Icon name={"md-close"} style={{ color: "grey", paddingLeft: 10 }} />
				</View>
				<View style={[styles.opponent, game.turn === StateTurn.AI ? { borderBottomWidth: 3 } : null]}>
					<Icon name={"md-radio-button-off"} style={{ color: "#299ddc", paddingRight: 10 }} />
					<Text>{game.opponent}</Text>
				</View>
			</View>
		);
	}

	private viewStatusGame = (status: StateStatus): React.ReactElement => {
		if (status !== StateStatus.PLAYING) {
			let text;
			if (status === StateStatus.WIN) {
				text = <Text style={{ fontSize: 18, color: "green" }}>YOU WIN!</Text>;
			} else if (status === StateStatus.LOSE) {
				text = <Text style={{ fontSize: 18, color: "red" }}>YOU LOSE</Text>;
			} else if (status === StateStatus.DRAW) {
				text = <Text style={{ fontSize: 18, color: "black" }}>DRAW</Text>;
			}
			return (
				<View style={{
					justifyContent: "center",
					alignItems: "center",
					height: 100
				}}>
					{text}
				</View>);
		}
	}

	render(): React.ReactElement {
		const { id, playerName } = this.props.navigation.state.params;
		const { games, editField } = this.props;
		return (
			<Container style={styles.container}>
				<Headers />
				<Content style={styles.content}>
					{this.viewScoreboard(playerName, games[id])}
					<GameField game={games[id]} editField={editField} />
					{this.viewStatusGame(games[id].status)}
				</Content>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);