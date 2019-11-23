import React from "react";
import { Header, Title, Body } from "native-base";
import { styles }from "./styles";

const Headers: React.FC = () => {
	return (
		<Header style={styles.headerColor}>
			<Body>
				<Title style={styles.headerTitle}>Tic Tac Toe</Title>
			</Body>
		</Header>
	);
};

export default Headers;
