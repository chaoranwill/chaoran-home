require('../../styles/Style.css');
var classNames = require('classnames');

import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import NavLink from '../widgets/NavLink';


export default class Home extends React.Component {	
	render() {
		return (
			<div className='container'>
				<div className={classNames('footer')}>
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