import React, { Component } from "react";
import { StatusBar } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { Container, Content, Text, View, Button } from "native-base";
import Headers from "../../components/shared/Headers";
import GameField from "../../components/elements/GameField";
import ScoreBoard from "../../components/elements/ScoreBoard";
import StatusGame from "../../components/elements/StatusGame";
import TimeGame from "../../components/elements/TimeGame";
import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";

import { Games, ApplicationStore, StateStatus, StateTurn, Coordinates } from "../../types/store";
import { styles } from "./styles";
import { turnAI } from "../../utils/turnAI";

import { editField, surrender, changeTime } from "../../redux/games/gamesActions";

interface GameScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
	games: Games;
	editField(id: string, turn: StateTurn, coordinates: Coordinates): Function;
	changeTime(id: string, time: number): Function;
	surrender(id: string): Function;
}

interface GameScreenState {
	intervalId: number;
}

class GameScreen extends Component<GameScreenProps, GameScreenState> {
	constructor(props) {
		super(props);
		this.state = {
			intervalId: 0
		};
	}

	componentDidUpdate(prevProps): void {
		const { id } = this.props.navigation.state.params;
		const { games, editField } = this.props;
		if (prevProps.games[id].turn !== games[id].turn) {
			if (games[id].turn === StateTurn.AI) {
				setTimeout(() => turnAI(id, games[id].field, editField), 0.5);
			} else if (games[id].turn === StateTurn.GAMEOVER) {
				clearInterval(this.state.intervalId);
			}
		}
	}

	componentDidMount(): void {
		const { games, editField } = this.props;
		const { id } = this.props.navigation.state.params;
		const intervalId = setInterval(() => this.timer(id), 1000);
		this.setState({ intervalId } as unknown);
		if (games[id].turn === StateTurn.AI) {
			setTimeout(() => turnAI(id, games[id].field, editField), 0.5);
		} 
	}

	componentWillUnmount(): void {
		clearInterval(this.state.intervalId);
	}

	private timer = (id): void => {
		this.props.changeTime(id, this.props.games[id].time + 1000);
	}

	private viewButton = (status: StateStatus, id: string): React.ReactElement => (
		<View style={styles.viewButton}>
			{
				status === StateStatus.PLAYING
					? <Button style={styles.button} onPress={() => this.props.surrender(id)}><Text>SURRENDER</Text></Button >
					: <Button style={styles.button} onPress={() => this.props.navigation.goBack()}><Text>BACK</Text></Button >
			}
		</View>
	);

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
					<TimeGame time={new Date(games[id].time)} />
					<StatusGame status={games[id].status} />
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