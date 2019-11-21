import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { View } from 'native-base';
import RootComponent from './src/RootComponent';
import { ActivityIndicator } from 'react-native';

class App extends Component {
	render(): React.ReactElement {
		const renderLoading: React.ReactNode = <View><ActivityIndicator size="large" /></View>;
		return (
			<Provider store={store}>
				<PersistGate loading={renderLoading} persistor={persistor}>
					<RootComponent />
				</PersistGate>
			</Provider >
		);
	}
}

export default App;