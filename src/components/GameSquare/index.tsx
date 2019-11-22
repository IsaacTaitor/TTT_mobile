import React from "react";
import { Text, View } from "native-base";

interface GamesSquareProps {
	opponent: string;
	last?: boolean;
}

const GamesSquare: React.FC<GamesSquareProps> = (props: GamesSquareProps) => {
	return (
		<View style={{ width: "23%", height: 74, backgroundColor: "grey", marginBottom: 5, marginRight: "2%" }}>
			<Text>{props.opponent}</Text>
		</View >
	);
};

export default GamesSquare;