import React from "react";
import { Text, View } from "native-base";
import { StateStatus } from "../../../types/store";
import { styles } from "./styles";

interface StatusGameProps {
	status: StateStatus;
}

const StatusGame: React.FC<StatusGameProps> = ({status}: StatusGameProps): React.ReactElement => {
	let text = null;
	if (status !== StateStatus.PLAYING) {
		switch (status) {
		case StateStatus.WIN:
			text = <Text style={styles.statusTextWin}>YOU WIN!</Text>;
			break;
		case StateStatus.LOSE:
			text = <Text style={styles.statusTextLose}>YOU LOSE</Text>;
			break;
		case StateStatus.DRAW:
			text = <Text style={styles.statusTextDraw}>DRAW</Text>;
			break;
		}
	}
	return (
		<View style={styles.statusGameView}>
			{text}
		</View>
	);
};

export default React.memo(StatusGame);