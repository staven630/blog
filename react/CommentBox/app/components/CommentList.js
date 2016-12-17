"use strict";
import React from 'react';
import Comment from './Comment';

export default  class CommentList extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        let nodes = this.props.data.map((item)=>{
            return (
                <Comment author={item.author} key={item.id}>
                    {item.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {nodes}
            </div>
        );
    }

}
