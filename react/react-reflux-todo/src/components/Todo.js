import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import store from '../stores/store';
import actions from '../actions/actions';
import List from './List';

export default class Todo extends React.Component {
	componentDidMount() {
		actions.getAll();
	}
	add() {
		var item = this.refs.item.value;
		this.refs.item.value = '';
		actions.add(item);
	}

  render() {  	
  	if (this.state.list) {
  		console.log(this.state)
  		return (
	    	<div>
		      <div className="index">
		        <input type="text" ref="item"/>
		        {" "}
		        <button onClick={this.add.bind(this)}>add</button>
		      </div>
		      <List items={this.state.list}/>
		    </div>
	    );    
  	}else{
  		return <div>empty</div>
			
  }
  	}
}


ReactMixin.onClass(Todo, Reflux.connect(store,'list'));
