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

const GamesSquare: React.FC<GamesSquareProps> = (props: GamesSquareProps) => (
	<TouchableHighlight
		onPress={props.onPress}
		style={[
			styles.gamesSquare,
			!props.isLast && styles.indent,
			props.status === StateStatus.PLAYING ? styles.playing : styles.end]}>
		<View style={styles.body}>
			{props.status === StateStatus.PLAYING
				? <Text style={styles.title}>{props.opponent}</Text>
				: <View style={styles.titleView}>
					<View style={styles.player}>
						<Text numberOfLines={2} style={[styles.titleEndGame, props.status === StateStatus.WIN && styles.titleWin]}>{props.playerName}</Text>
						{props.status === StateStatus.WIN && <Icon name={"checkmark"} style={styles.checkmark} />}
					</View>
					<View style={{ flexDirection: "row" }}>
						<Text numberOfLines={2} style={[styles.titleEndGame, props.status === StateStatus.LOSE && styles.titleWin]} >{props.opponent}</Text>
						{props.status === StateStatus.LOSE && <Icon name={"checkmark"} style={styles.checkmark} />}
					</View>
				</View>
			}
			<Text style={styles.time}>{moment(props.time).format("HH:mm:ss")}</Text>
		</View>
	</TouchableHighlight>
);

export default React.memo(GamesSquare);