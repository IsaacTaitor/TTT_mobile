import React, { Component } from "react";
import { Container, Content, Text, Icon, View } from "native-base";
import Headers from "../../components/Headers";
import { Game } from "../../types/store";
import { styles } from "./styles";

interface GameScreenProps {
	navigation: any;
	game: Game;
}

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

	private viewField = (field: Array<Array<string>>): React.ReactElement => {

		const styleLastRow = (i) => {
			if (!(i === 2)) {
				return styles.borderBottomWidth;
			}
		};
		return (
			<View style={{ alignItems: "center" }}>
				<View style={{ flexDirection: "column" }}>
					{
						field.map(
							(row, i) =>
								<View key={i} style={{ flexDirection: "row" }}>
									<View style={[styles.cell, styles.borderRightWidth, styleLastRow(i)]}>{row[0]}</View>
									<View style={[styles.cell, styles.borderRightWidth, styleLastRow(i)]}>{row[1]}</View>
									<View style={[styles.cell, styleLastRow(i)]}>{row[2]}</View>
								</View>
						)
					}
				</View>
			</View>
		);
	}

	render(): React.ReactElement {
		const { game, playerName } = this.props.navigation.state.params;
		return (
			<Container style={styles.container}>
				<Headers />
				<Content style={styles.content}>
					{this.viewScoreboard(playerName, game.opponent)}
					{this.viewField(game.field)}
				</Content>
			</Container>
		);
	}
}

export default GameScreen;