const Item = () => {
	/* Default values */
	var title = "Title";
	var description = "Description";
	var dueDate = "Date";
	var priority = "";
	var notes = [""];

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

	return { setTitle, setDescription, setDueDate, setPriority, addNote,
			 removeNote, getTitle, getDescription, getDueDate, getPriority,
			 getNotes };
};

export { Item };
