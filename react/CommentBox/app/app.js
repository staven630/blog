import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import CommentBox from 'components/CommentBox';

function App() {
	return <CommentBox url="/api/comments" pollInterval={2000} />;
}

const app = document.createElement('div');
document.body.appendChild(app);
render(<App />, app);
