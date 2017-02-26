import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute } from 'react-router';
import Home from './components/pages/Home';
import Project from './components/pages/Project';
import Team from './components/pages/Team';
import Record from './components/pages/Record';
import Memo from './components/pages/Memo';
import Mine from './components/pages/Mine';

// Render the main component into the dom
ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={Home}>
			<IndexRoute component={Project}/>
			<Route path="/team" component={Team}/>
			<Route path="/record" component={Record}/>
			<Route path="/memo" component={Memo}/>
			<Route path="/mine" component={Mine}/>
		</Route>
	</Router>
), document.getElementById('app'));
