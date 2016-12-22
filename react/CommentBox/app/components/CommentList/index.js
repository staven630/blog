import React, { PropTypes } from 'react';
import Comment from './comment.js';

const propTypes = {
	items: PropTypes.array.isRequired
};

function CommentList({ items }) {
	const rows = [];
	items.forEach((item, index) => {
		rows.push(<Comment key={index} item={item} />);
	});
	return <div className="comment-list">{rows}</div>;
}

CommentList.propTypes = propTypes;
export default CommentList;

