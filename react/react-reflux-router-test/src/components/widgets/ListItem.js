require('../../styles/ListItem.css');

import React from 'react';


class ListItem extends React.Component{
	render(){
			const {color, title, content} = this.props;
			return (
				<div>
					<div style={{color: color}}></div>
					<div>
						<div>
							<h3>{title}</h3>
							<p>负责人：{content.princ}，当前阶段：{content.stateNow}</p>
						</div>
					</div>
				</div>
			)
		
	}
}

export default ({ color, title, content }) => (
	<ListItem color={color} title={title} content={content}/>
)
  
