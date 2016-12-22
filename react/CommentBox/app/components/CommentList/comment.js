import React, { PropTypes } from 'react';

const propTypes = {
	item: PropTypes.object.isRequired
};

function Comment({ item }) {
	return (
		<div className="comment">
			<h4>{item.author}</h4>
			<span>{item.text}</span>
		</div>
	);
}

Comment.propTypes = propTypes;
export default Comment;