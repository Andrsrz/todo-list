const Project = () => {
	/* Default values */
	var title = "Title";
	var description = "Description";
	var todos = [];

	/* Setters */
	const setTitle = (newTitle) => title = newTitle;
	const setDescription = (newDescription) => description = newDescription;
	/* Getters */
	const getTitle = () => title;
	const getDescription = () => description;
	const getTodos = () => todos;

	const addTodo = (todo) => {
		todos.push(todo);
	}

	const updateTodo = (index, title, description, dueDate, priority, notes) => {
		todos[index].setTitle(title);
		todos[index].setDescription(description);
		todos[index].setDueDate(dueDate);
		todos[index].setPriority(priority);
		todos[index].setNotes(notes);
	}

	const removeTodo = (index) => {
		todos.splice(index, 1);
	}

	return { setTitle, setDescription, getTitle, getDescription, getTodos,
			 addTodo, updateTodo, removeTodo };
};

export { Project };
