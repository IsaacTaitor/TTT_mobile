import React, { Component } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Text, View, Button } from "native-base";
import Headers from "../../components/shared/Headers";
import GameField from "../../components/elements/GameField";
import ScoreBoard from "../../components/elements/ScoreBoard";

import { Games, ApplicationStore, StateStatus, StateTurn, Coordinates } from "../../types/store";
import { styles } from "./styles";
import { turnAI } from "../../utils";
import moment from "../../utils/moment";

import { editField, surrender, changeTime } from "../../redux/games/gamesActions";

interface GameScreenProps {
	navigation: any;
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
		this.state = { turnAI: true, intervalId: 0 };
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
				height: 70
			}}>
				{text}
			</View>);
	}

	private goBack = (): void => this.props.navigation.goBack();

	private viewButton = (status: StateStatus, id: string): React.ReactElement => {
		return (
			<View style={{ justifyContent: "center", alignItems: "center" }}>
				{
					status === StateStatus.PLAYING
						? <Button style={styles.button} onPress={(): Function => this.props.surrender(id)}><Text>SURRENDER</Text></Button >
						: <Button style={styles.button} onPress={this.goBack}><Text>BACK</Text></Button >
				}
			</View>
		);
	}

	private viewTimeGame = (time: Date): React.ReactElement => {
		return (
			<View style={{ justifyContent: "center", alignItems: "center", height: 70 }}>
				<Text style={{ fontSize: 20 }}>
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
				<StatusBar barStyle="light-content"/>
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

const mapStateToProps = (state: ApplicationStore): any => ({
	games: state.gamesStore
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): any => {
	return {
		editField: bindActionCreators(editField, dispatch),
		surrender: bindActionCreators(surrender, dispatch),
		changeTime: bindActionCreators(changeTime, dispatch)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);