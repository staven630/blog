var ListItem = require('./ListItem');
var id = 5;

module.exports = React.createClass({

    deleteItem: function (list, id) {
        for (var i = 0; i < list.length; i++){
            if (id == list[i].memberId) {
                list.splice(i, 1);
                break;
            }
        }
        this.forceUpdate();
    },

    removeItem: function () {
        this.setState({
            isHideAddIcon: false,
            member2: []
        });
    },

    toggleItem: function () {
        var item = this.state.member2.shift();
        item = this.state.member2.push(item);
        this.setState({
            member2: this.state.member2
        })
    },

    addItem: function (list, flag) {
        list.push({
            memberId: ++id,
            imgUrl: './assets/images/avatar01.jpg',
            memberName: 'Adrince'
        });

        if (flag == 'show') {
            this.setState({
                isHideAddIcon: true
            })
        }
        this.forceUpdate();
    },

    getInitialState: function () {
        return {
            isHideAddIcon: true,
            member0: [
                {
                    memberId: 0,
                    imgUrl: './assets/images/avatar01.jpg',
                    memberName: 'Adrince'
                },{
                    memberId: 3,
                    imgUrl: './assets/images/avatar03.jpg',
                    memberName: 'Andy'
                },
                {
                    memberId: 4,
                    imgUrl: './assets/images/avatar04.jpg',
                    memberName: 'Clond'
                }
            ],
            member1: [
                {
                    memberId: 0,
                    imgUrl: './assets/images/avatar01.jpg',
                    memberName: 'Adrince'
                },{
                    memberId: 1,
                    imgUrl: './assets/images/avatar02.jpg',
                    memberName: 'Andy'
                },
                {
                    memberId: 2,
                    imgUrl: './assets/images/avatar03.jpg',
                    memberName: 'Clond'
                }
            ],
            member2: [
                {
                    memberId: 0,
                    imgUrl: './assets/images/avatar01.jpg',
                    memberName: 'Adrince'
                },{
                    memberId: 1,
                    imgUrl: './assets/images/avatar02.jpg',
                    memberName: 'staven'
                },
                {
                    memberId: 2,
                    imgUrl: './assets/images/avatar03.jpg',
                    memberName: 'Clond'
                }
            ]
        }
    },

    render: function () {
        return (
            <div className="popup_content">
                <ListItem
                    teamName="项目成员"
                    data={this.state.member0}
                    onDelete={this.deleteItem.bind(this, this.state.member0)}
                    onAdd={this.addItem.bind(this, this.state.member0)}
                />
                <ListItem
                    teamName="参与成员"
                    data={this.state.member1}
                    onDelete={this.deleteItem.bind(this, this.state.member1)}
                    onAdd={this.addItem.bind(this, this.state.member1)}
                />
                <ListItem
                    teamName="负责人"
                    data={this.state.member2}
                    onDelete={this.removeItem}
                    onToggle={this.toggleItem}
                    onAdd={this.addItem.bind(this, this.state.member2, 'show')}
                    type="radio"
                    isHideAddIcon={this.state.isHideAddIcon}
                />
            </div>
        );
    }
});