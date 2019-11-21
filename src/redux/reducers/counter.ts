import { INCREMENT, DECREMENT } from "../constants";

const initialState = {
	counter: 0
};

export function counter(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case INCREMENT:
			return {
				...state,
				counter: this.state.counter + 1,
			}
		case DECREMENT:
			return {
				...state,
				counter: this.state.counter - 1,
			}
		default:
			return state;
	}
}