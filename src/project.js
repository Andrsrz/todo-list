class Project {
	constructor(title, description, todos){
		this.title = title ? title : "Title";
		this.description = description ? description : "Description";
		this.todos = todos ? todos : [];
	}
	/* Setters */
	setTitle(newTitle){ this.title = newTitle; }
	setDescription(newDescription){ this.description = newDescription; }
	setTodos(todosArr){
		this.todos = todosArr.slice();
	}
	/* Getters */
	getTitle(){ return this.title; }
	getDescription(){ return this.description; }
	getTodos(){ return this.todos; }

	addTodo(todo){
		this.todos.push(todo);
	}

	updateTodo(index, title, description, dueDate, priority, notes){
		this.todos[index].title = title;
		this.todos[index].description = description;
		this.todos[index].dueDate = dueDate;
		this.todos[index].priority = priority;
		this.todos[index].notes = notes;
	}

	removeTodo(index){
		this.todos.splice(index, 1);
	}
};

export { Project };
