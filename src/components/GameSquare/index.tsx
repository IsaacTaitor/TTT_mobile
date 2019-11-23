import React from "react";
import { Text, View } from "native-base";
import { styles } from "./styles";
import { TouchableNativeFeedback } from "react-native";

interface GamesSquareProps {
	opponent: string;
	isLast?: boolean;
	onPress(): void;
}

const GamesSquare: React.FC<GamesSquareProps> = (props: GamesSquareProps) => {
	const onPress = (): void => {
		props.onPress();
	};

	return (
		<TouchableNativeFeedback
			onPress={onPress}>
			<View
				style={[styles.body, props.isLast ? null : { marginRight: "2%" }]}
			>
				<Text style={styles.title}>{props.opponent}</Text>
			</View >
		</TouchableNativeFeedback>

	);
};

export default GamesSquare;