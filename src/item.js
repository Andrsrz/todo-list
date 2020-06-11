const Item = () => {
	/* Default values */
	var title = "Title";
	var description = "Description";
	var dueDate = "Date";
	var priority = "";
	var notes = "";
	var projectId;

	/* Setters */
	const setTitle = (newTitle) => title = newTitle;
	const setDescription = (newDescription) => description = newDescription;
	const setDueDate = (newDueDate) => dueDate = newDueDate;
	const setPriority = (newPriority) => priority = newPriority;
	const setNotes = (newNote) => notes = newNote;
	const setProjectId = (newProjectId) => projectId = newProjectId;
	/* Getters */
	const getTitle = () => title;
	const getDescription = () => description;
	const getDueDate = () => dueDate;
	const getPriority = () => priority;
	const getNotes = () => notes;
	const getProjectId = () => projectId;

	return { setTitle, setDescription, setDueDate, setPriority, setNotes,
			 getTitle, getDescription, getDueDate, getPriority, getNotes,
			 setProjectId, getProjectId };
};

export { Item };
