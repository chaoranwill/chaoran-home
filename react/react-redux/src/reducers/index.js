import { combineReducers } from 'redux';
import counter from './counter';

//使用redux的conmbineReducers方法将所有reducers打包
const rootReducer = combineReducers({
	counter
})

export default rootReducer