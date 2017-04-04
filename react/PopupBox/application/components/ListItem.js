var Item = require('./Item');

module.exports = React.createClass({

    getItemList: function () {
        if (this.props.type == 'radio') {
            return this.props.data.map(function (item, i) {
                return i == 0 ? (
                        <Item
                            key={i}
                            imgUrl={item.imgUrl}
                            memberName={item.memberName}
                            onDelete={this.props.onDelete}
                            onToggle={this.props.onToggle}
                        />
                    ) : null;
            }.bind(this))
        }

        return this.props.data.map(function (item, i) {
            return (
                <Item
                    key={i}
                    imgUrl={item.imgUrl}
                    memberName={item.memberName}
                    onDelete={this.props.onDelete.bind(this, item.memberId)}
                />
            );
        }.bind(this))
    },

    render: function () {
        return (
            <div className="item clearfix">
                <div>{this.props.teamName ? this.props.teamName : ''}</div>
                <ul className="clearfix">
                    {
                        this.getItemList()
                    }
                    <li onClick={this.props.onAdd} className={this.props.isHideAddIcon ? 'hide' : ''}>
                        <a>
                            <img src="assets/images/add.png" alt="头像"  />
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
});