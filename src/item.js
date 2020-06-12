class Item {
	constructor(title, description, dueDate, priority, notes, projectId){
		this.title = title ? title : "Title";
		this.description = description ? description : "Description";
		this.dueDate = dueDate ? dueDate : "Date";
		this.priority = priority ? priority : "No Priority";
		this.notes = notes ? notes : "No Notes";
		this.projectId = projectId ? projectId : null;
	}

	/* Setters */
	setTitle(newTitle){ this.title = newTitle; }
	setDescription(newDescription){ this.description = newDescription; }
	setDueDate(newDueDate){ this.dueDate = newDueDate; }
	setPriority(newPriority){ this.priority = newPriority; }
	setNotes(newNote){ this.notes = newNote; }
	setProjectId(newProjectId){ this.projectId = newProjectId; }
	/* Getters */
	getTitle(){ return this.title; }
	getDescription(){ return this.description; }
	getDueDate(){ return this.dueDate; }
	getPriority(){ return this.priority; }
	getNotes(){ return this.notes; }
	getProjectId(){ return this.projectId; }
};

export { Item };
