import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Text, Icon, View } from "native-base";
import Headers from "../../components/shared/Headers";
import GameField from "../../components/elements/GameField";
import { Game, Games, ApplicationStore, StateStatus } from "../../types/store";
import { styles } from "./styles";

import { editField } from "../../redux/games/gamesActions";

interface GameScreenProps {
	navigation: any;
	game: Game;
	games: Games;
	editField(): Function;
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

	private viewScoreboard = (playerName: string, opponent: string): React.ReactElement => {
		return (
			<View style={styles.scoreBoard}>
				<View style={styles.player}>
					<Text>{playerName}</Text>
					<Icon name={"md-close"} style={{ color: "grey", paddingLeft: 10 }} />
				</View>
				<View style={styles.opponent}>
					<Icon name={"md-radio-button-off"} style={{ color: "#299ddc", paddingRight: 10 }} />
					<Text>{opponent}</Text>
				</View>
			</View>
		);
	}

	render(): React.ReactElement {
		const { id, playerName } = this.props.navigation.state.params;
		const { games, editField } = this.props;
		return (
			<Container style={styles.container}>
				<Headers />
				<Content style={styles.content}>
					{this.viewScoreboard(playerName, games[id].opponent)}
					<GameField field={games[id].field} id={id} editField={editField} />
					{games[id].status === StateStatus.WIN
						? <Text>ВЫ ПОБЕДИЛИ!</Text>
						: games[id].status === StateStatus.LOSE
							? <Text>ВЫ ПРОИГРАЛИ :(</Text>
							: null}
				</Content>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);