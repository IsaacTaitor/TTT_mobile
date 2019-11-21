import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Container, Content, Icon, Fab, Input } from "native-base";
import { ApplicationStore } from "../../types/store";
import Headers from "../../components/Headers";
import { styles } from "./styles";
import { renamePlayer } from "../../redux/player/playerActions";

interface HomeScreenProps {
	playerName: string;
	renamePlayer(newName: string): void;
}

const mapStateToProps = (state: ApplicationStore): any => ({
	playerName: state.playerStore.playerName
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		renamePlayer: bindActionCreators(renamePlayer, dispatch)
	};
};


class HomeScreen extends Component<HomeScreenProps> {

	onEndEditing = (e) => {
		this.props.renamePlayer(e.nativeEvent.text);
	}

	render(): React.ReactElement {
		return (
			<Container style={styles.container}>
				<Headers />
				<Content style={styles.content}>
					<Input
						style={styles.inputName}
						defaultValue={this.props.playerName}
						onEndEditing={this.onEndEditing} />
				</Content>
				<Fab
					style={styles.buttonNewGame}
					position="bottomRight">
					<Icon name="add" />
				</Fab>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);