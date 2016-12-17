"use strict";

import React from 'react';
import {render} from 'react-dom';
import CommentBox from './components/CommentBox';
class App extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <CommentBox url="/api/comments" pollInterval={2000} />
        );
    }

}

const app = document.createElement('div');
document.body.appendChild(app);
render(<App/>, app);