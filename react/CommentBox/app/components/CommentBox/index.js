import React, { PropTypes } from 'react';
import CommentList from '../CommentList/index';
import CommentForm from '../CommentForm';
import $ from 'jquery';

const propTypes = {
	pollInterval: PropTypes.number,
	url: PropTypes.string
};

class CommentBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.loadData = this.loadData.bind(this);
		this.submitData = this.submitData.bind(this);
	}

	componentDidMount() {
		this.loadData();
		setInterval(this.loadData(), this.props.pollInterval);
	}

	loadData() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: (data) => this.setState( {data: data} ),
			error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
		});
	}

	submitData(comment) {
		const comments = this.state.data;
		for (const d in comments){
			if (comments[d].author.trim() === comment.author.trim()) {
				return;
			}
		}
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: (data) => this.setState( {data: data} ),
			error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
		});

	}

	render() {

		return (
			<div className="comment-box">
				<h1>评论列表</h1>
				<CommentList items={this.state.data} />
				<CommentForm submitData={this.submitData} />
			</div>
		);
	}
}

CommentBox.propTypes = propTypes;
export default CommentBox;