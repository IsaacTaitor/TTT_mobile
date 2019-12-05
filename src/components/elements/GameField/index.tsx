import React from "react";
import { View, Icon } from "native-base";
import { styles } from "./styles";
import { StateCell, StateTurn, StateStatus, Game, Coordinates } from "../../../types/store";
import { TouchableWithoutFeedback } from "react-native";

interface GameFieldProps {
	game: Game;
	editField(id: string, turn: StateTurn, coordinates: Coordinates): Function;
}

const GameField: React.FC<GameFieldProps> = (props: GameFieldProps) => {

	const viewIcon = (state: StateCell): React.ReactElement => {
		switch (state) {
		case StateCell.X:
			return <Icon name={"md-close"} style={styles.crossIcon} />;
		case StateCell.O:
			return <Icon name={"md-radio-button-off"} style={styles.noughtIcon} />;
		}
	};

	const styleLastRow = (i: number) => {
		if (!(i === 2)) {
			return styles.borderBottomWidth;
		}
	};

	const onPress = (state: StateCell, coordinates: Coordinates): void => {
		if ((props.game.turn === StateTurn.PLAYER) && (props.game.status === StateStatus.PLAYING) && (state === StateCell.Empty)) {
			props.editField(props.game.id, StateTurn.PLAYER, coordinates);
		}
	};

	return (
		<View style={styles.grid}>
			{
				props.game.field.map((row: Array<StateCell>, i: number) =>
					<View key={i} style={styles.row}>
						{
							row.map((state: StateCell, k: number) =>
								<TouchableWithoutFeedback
									key={i + "" + k}
									onPress={(): void => onPress(state, { x: i, y: k })}>
									<View style={[styles.cell, k !== 2 && styles.borderRightWidth, styleLastRow(i)]}>
										<View style={styles.viewIcon}>
											{viewIcon(row[k])}
										</View>
									</View>
								</TouchableWithoutFeedback>
							)}
					</View>
				)}
		</View>
	);
};

export default React.memo(GameField);