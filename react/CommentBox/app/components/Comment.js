"use strict";

import React from 'react';
import marked from 'marked';
export default class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    rawMarkup(){
        var rawMarkup = marked(this.props.children.toString());
        return {__html: rawMarkup};
    }
    render() {

        return (
            <div className="Comments">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
            </div>
        );
    }

}