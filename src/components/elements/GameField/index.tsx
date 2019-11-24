import React from "react";
import { View, Icon } from "native-base";
import { styles } from "./styles";
import { StateCell, StateTurn, StateStatus, Game } from "../../../types/store";
import { TouchableWithoutFeedback } from "react-native";

interface GameFieldProps {
	game: Game;
	editField(id: string, turn: StateTurn, coordinates: { x: number; y: number }): Function;
}

const GameField: React.FC<GameFieldProps> = (props: GameFieldProps) => {

	const viewIcon = (state: StateCell): React.ReactElement => {
		switch (state) {
		case StateCell.X:
			return <Icon name={"md-close"} style={{ color: "grey", fontSize: 80 }} />;
		case StateCell.O:
			return <Icon name={"md-radio-button-off"} style={{ color: "#299ddc", fontSize: 70 }} />;
		}
	};

	const styleLastRow = (i: number): any => {
		if (!(i === 2)) {
			return styles.borderBottomWidth;
		}
	};

	return (
		<View style={{ alignItems: "center" }}>
			<View style={{ flexDirection: "column" }}>
				{
					props.game.field.map((row: Array<StateCell>, i: number) =>
						<View key={i} style={{ flexDirection: "row" }}>
							{
								row.map((state: StateCell, k: number) =>
									<TouchableWithoutFeedback
										key={i + "" + k}
										onPress={(): void => {
											if ((props.game.turn === StateTurn.PLAYER) && (props.game.status === StateStatus.PLAYING) && (row[k] === StateCell.Empty)) {
												props.editField(props.game.id, StateTurn.PLAYER, { x: i, y: k });
											}
										}
										}>
										<View style={[styles.cell,
											k === 2 ? null : styles.borderRightWidth,
											styleLastRow(i)]}>
											{viewIcon(row[k])}
										</View>
									</TouchableWithoutFeedback>
								)
							}
						</View>
					)
				}
			</View>
		</View>
	);
};

export default GameField;