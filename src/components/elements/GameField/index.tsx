import React from "react";
import { View, Icon } from "native-base";
import { styles } from "./styles";
import { StateCell } from "../../../types/store";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native";

interface GameFieldProps {
	field: Array<Array<StateCell>>;
	id: string;
	editField(id: string, step: string, coordinates: { x: number; y: number }): Function;
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
					props.field.map((row: Array<StateCell>, i: number) =>
						<View key={i} style={{ flexDirection: "row" }}>
							<TouchableWithoutFeedback onPress={(): Function => props.editField(props.id, "player", { x: i, y: 0 })}>
								<View style={[styles.cell, styles.borderRightWidth, styleLastRow(i)]}>{viewIcon(row[0])}</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPress={(): Function => props.editField(props.id, "player", { x: i, y: 1 })}>
								<View style={[styles.cell, styles.borderRightWidth, styleLastRow(i)]}>{viewIcon(row[1])}</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPress={(): Function => props.editField(props.id, "player", { x: i, y: 2 })}>
								<View style={[styles.cell, styleLastRow(i)]}>{viewIcon(row[2])}</View>
							</TouchableWithoutFeedback>
						</View>
					)
				}
			</View>
		</View>
	);
};

export default GameField;