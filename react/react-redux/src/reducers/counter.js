import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

//reducer其实只是个放而已，参数是state和action，返回值是新的state
//reducer用于更新state
export default function counter(state = 0, action){
	switch (action.type){
		case INCREMENT_COUNTER: 
			return state + 1
		case DECREMENT_COUNTER:
			return state - 1
		default: 
			return state
	}
}