import React from "react";
import { Text, View, Icon } from "native-base";
import { styles } from "./styles";
import { TouchableHighlight } from "react-native";
import { StateStatus } from "../../../types/store";
import moment from "../../../utils/moment";

interface GamesSquareProps {
	opponent: string;
	time: number;
	status: StateStatus;
	playerName: string;
	isLast?: boolean;
	onPress(): void;
}

const GamesSquare: React.FC<GamesSquareProps> = (props: GamesSquareProps) => {
	const onPress = (): void => {
		props.onPress();
	};
	return (
		<TouchableHighlight
			onPress={onPress}
			style={[
				styles.body,
				props.isLast ? null : { marginRight: "2%" },
				props.status === StateStatus.PLAYING ? { backgroundColor: "#838383" } : { backgroundColor: "#D3D3D3" }]}>

			<View style={{ width: "100%", height: "100%" }}>
				{props.status === StateStatus.PLAYING
					? <Text style={styles.title}>{props.opponent}</Text>
					: <View style={styles.titleView}>
						<View style={{ borderBottomWidth: 0.5, paddingBottom: 3, marginBottom: 3, flexDirection: "row" }}>
							<Text style={[styles.titleEndGame, props.status === StateStatus.WIN ? styles.titleWin : null]}>{props.playerName}</Text>
							{props.status === StateStatus.WIN ? <Icon name={"checkmark"} style={[{fontSize: 18, paddingLeft: 5}, styles.titleWin]} /> : null}
						</View>
						<View style={{ flexDirection: "row" }}>
							<Text style={[styles.titleEndGame, props.status === StateStatus.LOSE ? styles.titleWin : null]} >{props.opponent}</Text>
							{props.status === StateStatus.LOSE ? <Icon name={"checkmark"} style={[{fontSize: 18, paddingLeft: 5}, styles.titleWin]} /> : null}
						</View>
					</View>
				}
				<Text style={{ fontSize: 10, position: "absolute", bottom: 2, right: 1 }}>{moment(props.time).format("HH:mm:ss")}</Text>
			</View>
		</TouchableHighlight>
	);
};

export default GamesSquare;