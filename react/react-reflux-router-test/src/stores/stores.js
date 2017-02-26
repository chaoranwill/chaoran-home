import Reflux from 'reflux';
import actions from '../actions/actions';

export default Reflux.createStore({
	items: [
		{
			id: 2017,
			title: 'WECHATPM|UI设计',
			color: 'red',
			content: {
				princ: '汪主任',
				stateNow: '方案设计'
			}
		}
	],
	listenables: [actions],
	onGetAll(){
		console.log(this.items);
		this.trigger({projects: this.items});
	},
	onAddProject(){
		console.log('add');
		this.items.push({
			id: 2017,
			title: 'WECHATPM|UI设计',
			color: 'red',
			content: {
				princ: '汪主任',
				stateNow: '方案设计'
			}
		});
		this.trigger({projects: this.items});
	}
});