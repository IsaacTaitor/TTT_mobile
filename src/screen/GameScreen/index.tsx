import React, { Component } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Text, View, Button } from "native-base";
import Headers from "../../components/shared/Headers";
import GameField from "../../components/elements/GameField";
import ScoreBoard from "../../components/elements/ScoreBoard";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { Games, ApplicationStore, StateStatus, StateTurn, Coordinates } from "../../types/store";
import { styles } from "./styles";
import { turnAI } from "../../utils/turnAI";
import moment from "../../utils/moment";

import { editField, surrender, changeTime } from "../../redux/games/gamesActions";

interface GameScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	games: Games;
	editField(id: string, turn: StateTurn, coordinates: Coordinates): Function;
	changeTime(id: string, time: number): Function;
	surrender(id: string): Function;
}

interface GameScreenState {
	turnAI: boolean;
	intervalId: number;
}

class GameScreen extends Component<GameScreenProps, GameScreenState> {
	constructor(props) {
		super(props);
		this.state = {
			turnAI: true,
			intervalId: 0
		};
	}

	componentDidUpdate(): void {
		const { id } = this.props.navigation.state.params;
		const { games, editField } = this.props;
		if (games[id].turn === StateTurn.AI) {
			if (this.state.turnAI) {
				setTimeout(() => turnAI(id, games[id].field, editField), 0);
				this.setState({ turnAI: false });
			}
		} else if (games[id].turn === StateTurn.PLAYER) {
			if (!this.state.turnAI) {
				this.setState({ turnAI: true });
			}
		} else {
			clearInterval(this.state.intervalId);
		}
	}

	componentDidMount(): void {
		const { id } = this.props.navigation.state.params;
		const intervalId = setInterval(() => this.timer(id), 1000);
		this.setState({ intervalId });
	}

	componentWillUnmount(): void {
		clearInterval(this.state.intervalId);
	}

	private timer = (id): void => {
		this.props.changeTime(id, this.props.games[id].time + 1000);
	}

	private viewStatusGame = (status: StateStatus): React.ReactElement => {
		let text = null;
		if (status !== StateStatus.PLAYING) {
			switch (status) {
			case StateStatus.WIN:
				text = <Text style={styles.statusTextWin}>YOU WIN!</Text>;
				break;
			case StateStatus.LOSE:
				text = <Text style={styles.statusTextLose}>YOU LOSE</Text>;
				break;
			case StateStatus.DRAW:
				text = <Text style={styles.statusTextDraw}>DRAW</Text>;
				break;
			}
		}
		return (
			<View style={styles.statusGameView}>
				{text}
			</View>);
	}

	private viewButton = (status: StateStatus, id: string): React.ReactElement => {
		return (
			<View style={styles.viewButton}>
				{
					status === StateStatus.PLAYING
						? <Button style={styles.button} onPress={() => this.props.surrender(id)}><Text>SURRENDER</Text></Button >
						: <Button style={styles.button} onPress={() => this.props.navigation.goBack()}><Text>BACK</Text></Button >
				}
			</View>
		);
	}

	private viewTimeGame = (time: Date): React.ReactElement => {
		return (
			<View style={styles.viewTimeGame}>
				<Text style={styles.time}>
					{moment(time).format("HH:mm:ss")}
				</Text>
			</View>
		);
	}

	render(): React.ReactElement {
		const { id, playerName } = this.props.navigation.state.params;
		const { games, editField } = this.props;
		return (
			<Container style={styles.container}>
				<Headers />
				<StatusBar barStyle="light-content" />
				<Content style={styles.content}>
					<ScoreBoard playerName={playerName} game={games[id]} />
					<GameField game={games[id]} editField={editField} />
					{this.viewTimeGame(new Date(games[id].time))}
					{this.viewStatusGame(games[id].status)}
					{this.viewButton(games[id].status, id)}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state: ApplicationStore) => ({
	games: state.gamesStore
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {
		editField: bindActionCreators(editField, dispatch),
		surrender: bindActionCreators(surrender, dispatch),
		changeTime: bindActionCreators(changeTime, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);