'use strict';

var app = {}; // create namespace for our app

//--------------
// Models
//--------------
app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});

//--------------
// Collections
//--------------
app.TodoList = Backbone.Collection.extend({
    model: app.Todo,
    localStorage: new Store("backbone-todo"),
});

// instance of the Collection
app.todoList = new app.TodoList();


//--------------
// Views
//--------------

// renders individual todo items list (li)
app.TodoView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#item-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this; // enable chained calls
    },
    initialize: function(){
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM.
    }
});

// renders the full list of todo items calling TodoView for each one.
app.AppView = Backbone.View.extend({
    el: '#todoapp',
    initialize: function () {
        //this.input = this.$('#new-todo');
        app.todoList.on('add', this.addAll, this);
        app.todoList.on('reset', this.addAll, this);
        app.todoList.fetch(); // Loads list from local storage
    },
    addOne: function(todo){
        var view = new app.TodoView({model: todo});
        $('#todo-list').append(view.render().el);
    },
    addAll: function(){
        this.$('#todo-list').html(''); // clean the todo list
        app.todoList.each(this.addOne, this);
    }
});

//--------------
// Routers
//--------------
app.Router = Backbone.Router.extend({
    routes: {
        '*filter' : 'setFilter'
    },
    setFilter: function(params) {
        //console.log('app.router.params = ' + params); // just for didactical purposes.
        window.filter = params.trim() || '';
        app.todoList.trigger('reset');
    }
});

//--------------
// Initializers
//--------------

app.router = new app.Router();
Backbone.history.start();
app.appView = new app.AppView();
