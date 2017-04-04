module.exports = React.createClass({
    render: function () {
        return (
            <li>
                <a onClick={this.props.onToggle ? this.props.onToggle : null}>
                    <img src={this.props.imgUrl} alt="头像" />
                    {this.props.memberName ? this.props.memberName : ''}
                </a>
                <i onClick={this.props.onDelete}></i>
            </li>
        );
    }
});