$(document).ready(function(){
	$.getJSON("/api/todos")
	.then(showTodos)

	$('#todoInput').keypress(function(event){
		if(event.which == 13){
			createTodo();
		}
	});

	$('.list').on('click','li',function(){
		updateTodo($(this));
	});

	$('.list').on('click','span',function(e){
		e.stopPropagation();
		var id = $(this).parent().data('id');
		$(this).parent().remove();
		$.ajax({
			method:'DELETE',
			url: '/api/todos/' + id
		})
	});
});

function showTodos(todos){
	todos.forEach(function(todo){
		var newTodo = $('<li class="task">'+ todo.name + '<span>X</span></li>');
		newTodo.data('id',todo._id);
		newTodo.data('completed',todo.completed);
		if(todo.completed){
			newTodo.addClass('done');
		}
		$('.list' ).append(newTodo);
	});
}

function createTodo(){
	var userInput = $('#todoInput').val();
	$.post('/api/todos',{name: userInput})
	.then(function(todo){
		$('#todoInput').val('');
		var newTodo = $('<li class="task">'+ todo.name + '<span>X</span></li>');
		if(todo.completed){
			newTodo.addClass('done');
		}
		$('.list' ).append(newTodo);
	})
}

function updateTodo(todo){
	var isDone = !todo.data('completed');
	var updateData = {completed: isDone};
	$.ajax({
		method: 'PUT',
		url: '/api/todos/' + todo.data('id'),
		data: updateData
	}).then(function(result){
		todo.toggleClass('done');
		todo.data('completed',isDone);
	})
}