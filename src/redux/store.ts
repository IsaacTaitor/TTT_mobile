import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createLogger } from "redux-logger";
import reduxThunk from "redux-thunk";
import promise from "redux-promise";

import { playerReducer } from "./player/playerReducers";
import { gamesReducer } from "./games/gamesReducers";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	blacklist: ["gamesStore"]
};

const persistedReducer = persistCombineReducers(persistConfig, {
	playerStore: playerReducer,
	gamesStore: gamesReducer
});

const logger = createLogger();
const middleWares = compose(applyMiddleware(reduxThunk, promise, logger));

const store = createStore(
	persistedReducer,
	middleWares,
);

const persistor = persistStore(store);

export { store, persistor };