## 定义
>使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，知道有一个对象处理它为止。

## 实例
```
//任务执行候选者
var Person = function(name, skill) {
    this.name = name;
    this.skill = skill;
    this.next ={};    //下一个候选执行者
};

Person.prototype = {
    constructor: Person,
    //执行任务
    action: function() {
        return this;
    },
    //设置当前候选执行者的下一个候选执行者
    setNext: function(person) {
        this.next = person;
        return person;
    }
};

//任务分发者
var Assign = function(task) {
    this.task = task;    
};

Assign.prototype = {
    constructor: Assign,
    filter: function(person) {  //核心
        return this.task == person.skill ? //判断是否由当前候选执行者来执行
            person.action() : 
            arguments.callee.call(this, person.next);  //递归判断下一个候选执行者
    }
};

var p1 = new Person('Staven', 'JavaScript');
var p2 = new Person('Bob', 'Animation');
var p3 = new Person('Tom', 'WebSocket');
var p4 = new Person('Kim', 'React Native');
p1.setNext(p2).setNext(p3).setNext(p4);


var assign = new Assign('JavaScript');
var obj = assign.filter(p1);    
console.log(obj.name + '的技能是：' + obj.skill); //Staven的技能是：JavaScript

var assign = new Assign('Animation');
var obj = assign.filter(p1);    
console.log(obj.name + '会' + obj.skill);    //Bob会Animation
```
