var express = require('express');
var app = express();
var port = 8000 || process.env.PORT;
var db = require('./models');
var bodyParser =require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));


app.get('/',function(req,res){
	res.sendFile('index.html');
});



// ============================
// API ROUTE
// ============================

// VIEW TODO

app.get('/api/todos',function(req,res){
	db.Todo.find()
	.then(function(todos){
		res.json(todos);
	})
	.catch(function(err){
		res.send(err);
	});
});

// CREATE NEW TODO

app.post('/api/todos',function(req,res){
	db.Todo.create(req.body)
	.then(function(newTodo){
		res.json(newTodo);
	})
	.catch(function(err){
		res.send(err);
	});
});

// VIEW PARTICULAR TODO

app.get('/api/todos/:todoid',function(req,res){
	db.Todo.findById(req.params.todoid)
	.then(function(todo){
		res.json(todo);
	})
	.catch(function(err){
		res.send(err);
	});
});

// UPDATE TODO

app.put('/api/todos/:todoid',function(req,res){
	db.Todo.findOneAndUpdate({_id : req.params.todoid}, req.body, {new: true})
	.then(function(update){
		res.json(update);
	})
	.catch(function(err){
		res.send(err);
	});
});

// DELETE PARTICULAR TODO

app.delete('/api/todos/:todoid',function(req,res){
	db.Todo.deleteOne({_id : req.params.todoid})
	.then(function(){
		res.send("We deleted it!");
	})
	.catch(function(err){
		res.send(err);
	});
});

// PORT LISTENING

app.listen(port,function(){
	console.log("App is running on port 8000");
});