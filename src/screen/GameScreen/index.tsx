import React, { Component } from "react";
import { Container, Content, Icon, Fab, Input } from "native-base";
import Headers from "../../components/Headers";
import { styles } from "./styles";

interface GameScreenProps {
	navigation: any;
}

class GameScreen extends Component<GameScreenProps> {

	render(): React.ReactElement {
		return (
			<Container style={styles.container}>
				<Headers />
			</Container>
		);
	}
}

export default GameScreen;