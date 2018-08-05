var Todoapp = (function () {
    var todolist = [];
    var filter = 'all'; // all, active, completed

    var addTodo = (name) => {
        var newItem = {
            name,
            done: false,
        };

        todolist.push(newItem);
    };

    var doneTodo = (index) => {
        todolist[index].done = true;
    };

    var getTodolist = () => todolist;

    var changeFilter = (_filter) => filter = _filter;

    var getFilter = () => filter;

    return {
        addTodo, doneTodo,
        getTodolist,
        changeFilter, getFilter,
    }
})();

var View = (function (Todoapp) {
    var render = () => {
        // todolist
        var listnode = document.querySelector('.todo-list');
        var wrapper = document.querySelector('.todo-list-wrapper');
        listnode.remove();
        
        listnode = document.createElement('ul');
        listnode.setAttribute('class', 'todo-list');
        wrapper.appendChild(listnode);

        var list = Todoapp.getTodolist();
        var i;
        for (i = 0; i < list.length; i++) {
            if(
                (Todoapp.getFilter() === 'active' && !list[i].done) ||
                (Todoapp.getFilter() === 'completed' && list[i].done) ||
                (Todoapp.getFilter() === 'all')
            ) {
                listnode.innerHTML += `
                    <li onclick="Todoapp.doneTodo(${i}); View.render();"
                        style="cursor: pointer; ${list[i].done ? 'text-decoration: line-through' : ''}">
                        ${list[i].name}
                    </li>
                `;
            }
        }

        // filter
        var filter = {
            all: document.querySelector('.all'),
            active: document.querySelector('.active'),
            completed: document.querySelector('.completed'),
        };

        for (key in filter) {
            Todoapp.getFilter() === key ? filter[key].setAttribute('disabled', true) : filter[key].removeAttribute('disabled');
        }
    }

    return { render }
})(Todoapp);

View.render();

var input = document.querySelector('.input');
var add = document.querySelector('.add');
var all = document.querySelector('.all');
var active = document.querySelector('.active');
var completed = document.querySelector('.completed');

add.addEventListener('click', () => {
    if (input.value == null || input.value == '') {
        console.log('no text');
        return;
    }
    Todoapp.addTodo(input.value);
    View.render();
    input.value = "";
});

all.addEventListener('click', () => {
    Todoapp.changeFilter('all');
    View.render();
});

active.addEventListener('click', () => {
    Todoapp.changeFilter('active');
    View.render();
});

completed.addEventListener('click', () => {
    Todoapp.changeFilter('completed');
    View.render();
});