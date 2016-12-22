import React, { PropTypes } from 'react';

const propTypes = {
	submitData: PropTypes.func.isRequired
};

class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			author: '',
			text: ''
		};
		this.handleAuthorChange = this.handleAuthorChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.submitHandle = this.submitHandle.bind(this);
	}

	handleAuthorChange(e) {
		this.setState({ author: e.target.value });
	}

	handleTextChange(e) {
		this.setState( {text: e.target.value} );
	}

	submitHandle(e) {
		e.preventDefault();
		const author = this.state.author.trim();
		const text = this.state.text.trim();
		if (!author || !text){
			return;
		}

		this.props.submitData({ author: author, text: text });
		this.setState({
			author: author,
			text: text
		});
	}

	render() {
		return (<form className="comment-form" onSubmit={this.submitHandle} >
			<input type="text" value={this.state.author} onChange={this.handleAuthorChange} />
			<input type="text" value={this.state.text} onChange={this.handleTextChange} />
			<input type="submit" value="提交" />
		</form>);
	}

}

CommentForm.propTypes = propTypes;
export default CommentForm;