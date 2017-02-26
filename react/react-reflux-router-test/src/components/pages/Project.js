import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import actions from '../../actions/actions';
import stores from '../../stores/stores';
import ListItem from '../widgets/ListItem';

export default class Project extends React.Component {	
	componentDidMount(){
		actions.getAll();
	}
	
	render() {
		
		if (this.state.projects) {
			const projects = this.state.projects.projects;
			console.log(projects);
			return (
				<div>
					<button onClick={actions.addProject}>+</button>
					<ul>{projects.map((project, id) => 
						<li key={id}>
							<ListItem color={project.color} title={project.title} content={project.content}/>
						</li>
					)}</ul>
				</div>
				
			)
			
		}else{
			return <div></div>
		}
		
		
	}
}
  
ReactMixin.onClass(Project, Reflux.connect(stores, 'projects'));