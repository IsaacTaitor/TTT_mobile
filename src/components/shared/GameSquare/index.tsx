import React from "react";
import { Text, View } from "native-base";
import { styles } from "./styles";
import { TouchableNativeFeedback } from "react-native";
import moment from "moment";
import "moment-timezone";

interface GamesSquareProps {
	opponent: string;
	time: number;
	isLast?: boolean;
	onPress(): void;
}

const GamesSquare: React.FC<GamesSquareProps> = (props: GamesSquareProps) => {
	moment.locale("en");
	moment.tz.setDefault("UTC");
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
				<Text style={{ fontSize: 10, position: "absolute", bottom: 2, right: 1 }}>{moment(props.time).format("HH:mm:ss")}</Text>
			</View >
		</TouchableNativeFeedback>
	);
};

export default GamesSquare;