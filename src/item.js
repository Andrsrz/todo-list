const Item = () => {
	/* Default values */
	var title = "";
	var description = "";
	var dueDate = "";
	var priority = "";
	var notes = [];
	const priorities = ["green", "yellow", "orange", "red"];

	/* Setters */
	const setTitle = (newTitle) => title = newTitle;
	const setDescription = (newDescription) => description = newDescription;
	const setDueDate = (newDueDate) => dueDate = newDueDate;
	const setPriority = (newPriority) => priority = newPriority;
	const addNote = (newNote) => notes.push(newNote);
	const removeNote = (index) => notes.splice(index, 1);
	/* Getters */
	const getTitle = () => title;
	const getDescription = () => description;
	const getDueDate = () => dueDate;
	const getPriority = () => priority;
	const getNotes = () => notes;
	const getPriorities = () => priorities;

	return { setTitle, setDescription, setDueDate, setPriority, addNote,
			 removeNote, getTitle, getDescription, getDueDate, getPriority,
			 getNotes, getPriorities };
};

export { Item };
