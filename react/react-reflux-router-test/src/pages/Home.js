require('../styles/Style.css');

import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import NavLink from '../components/NavLink';

export default class Home extends React.Component {	
	render() {
		return (
			<div>
				<div>
					<ul>
						<li><NavLink to="/" onlyActiveOnIndex>Project</NavLink></li>
						<li><NavLink to="/team">team</NavLink></li>
						<li><NavLink to="/record">record</NavLink></li>
						<li><NavLink to="/memo">memo</NavLink></li>
						<li><NavLink to="/mine">mine</NavLink></li>
					</ul>
				</div>
				{this.props.children}
			</div>
			
		)
		
	}
}

// ReactMixin.onClass(App, Reflux.connect(stores));