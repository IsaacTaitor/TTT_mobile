import React from "react";
import { Text, View } from "native-base";
import { styles } from "./styles";

import moment from "../../../utils/moment";

interface TimeGameProps {
	time: Date;
}

const TimeGame: React.FC<TimeGameProps> = ({time}: TimeGameProps): React.ReactElement => (
	<View style={styles.viewTime}>
		<Text style={styles.time}>
			{moment(time).format("HH:mm:ss")}
		</Text>
	</View>
);

export default React.memo(TimeGame);