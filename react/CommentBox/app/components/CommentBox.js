"use strict";

import React from 'react';
import CommentList from './CommentList';
import CommentFrom from './CommentForm';
import $ from 'jquery';
export default  class CommentBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    loadData(){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    submitData(comment){
        let comments= this.state.data;
        for(var d in comments){
            if(comments[d]["author"].trim() == comment['author'].trim()){
                return;
            }
        }
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadData();
        setInterval(this.loadData(), this.props.pollInterval);
    }

    render() {
        let sty = {
            color: "blue"
        };
        return (
            <div  className="commentBox" >
                <h1 style={sty}>Comments</h1>
                <CommentList data={this.state.data} />
                <hr/>
                <CommentFrom submitData={this.submitData.bind(this)} />
            </div>
        );
    }

}

