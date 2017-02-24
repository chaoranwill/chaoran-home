import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import store from '../stores/store';
import actions from '../actions/actions';

class List extends React.Component{
	delete(i){
		actions.delete(i);
	}
	render(){
		const items = this.props.items;
		return(
			<ul>{items.list.map((item, i) => 
				<li key={i}>
					{item.name}
					<button onClick={this.delete.bind(this,i)}>x</button>
				</li>
				)}</ul>
		)
	}
}

export default ({items}) => (
	<List items={items}/>
	
);