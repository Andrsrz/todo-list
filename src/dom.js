import { Index } from './index.js';
import './style/style.css';

const Dom = (() => {
	const body = document.body;
	const main = document.createElement("main");
	const projectsHeader = document.createElement("div");
	const projectsBody = document.createElement("div");
	const projects = document.createElement("div");
	const itemsHeader = document.createElement("div");
	const itemsBody = document.createElement("div");
	const items = document.createElement("div");
	const footer = document.createElement("footer");
	const todoPriorities = ["High", "Neutral", "Low"];

	const populatePage = () => {
		projects.appendChild(projectsHeader);
		projects.appendChild(projectsBody);
		main.appendChild(projects);
		main.appendChild(items);
		body.appendChild(main);
		body.appendChild(footer);
		renderProjectsHeader();
		renderFooter();
	}

	const setNewProjectButtonEvent = (button) => {
		button.addEventListener("click", Index.generateNewProject, false);
	}

	const setNewTodoButtonEvent = (button, index) => {
		/* Had to wrap the function in another function
		 * because it was getting called forever. */
		button.addEventListener("click", function () {
			Index.generateNewTodo(index);
		}, false);
	}

	const renderProjectsHeader = () => {
		let addProject = document.createElement("button");
		addProject.innerHTML = "New Project";
		addProject.className = "button";
		addProject.id = "add-project";
		setNewProjectButtonEvent(addProject);
		if(projectsHeader.appendChild(addProject))
			return true;
	}

	/* Clear the div before render it again */
	const clearDiv = (divToClear) => {
		while(divToClear.firstChild){
			divToClear.removeChild(divToClear.firstChild);
		}
	}

	const setProjectClickEvent = (span, edit, del, ok) => {
		span.addEventListener("click", function (e) {
			Index.getTodosFromProject(e.target.className);
		}, false);
		edit.addEventListener("click", function (e) {
			// Disable add buttons
			let newProject = document.getElementById("add-project");
			newProject.disabled = true;
			Index.editProject(e.target.parentNode.parentNode.parentNode);
		}, false);
		del.addEventListener("click", function (e) {
			Index.deleteProject(e.target.className);
		}, false);
		ok.addEventListener("click", function (e) {
			// Enable add buttons
			let newProject = document.getElementById("add-project");
			newProject.disabled = false;
			getFormValues(e.target.className, e.target.parentNode.parentNode.parentNode);
		}, false);
	}

	/* Render the projects from the projects array */
	const renderProjects = (projectsArr) => {
		clearDiv(projectsBody);
		for(let i = 0; i < projectsArr.length; i++){
			let projectTitle = projectsArr[i].getTitle() + i;
			/* Create the elments. */
			let spanProject = document.createElement("span");
			let spanTitleContainer = document.createElement("span");
			let h2Title = document.createElement("h2");
			let spanButtonsContainer = document.createElement("span");
			let btnEdit = document.createElement("button");
			let btnDelete = document.createElement("button");
			let space = document.createElement("hr");
			let h4Description = document.createElement("h4");
			/* This elements are for editing the project */
			let inputTitle = document.createElement("input");
			let inputDescription = document.createElement("textarea");
			let btnOk = document.createElement("button");
			/* Set attributes. */
			spanProject.className = "project-container " + projectTitle;
			spanTitleContainer.className = "project-title-container " + projectTitle;
			h2Title.className = "project-title " + projectTitle;
			spanButtonsContainer.className = "project-buttons-container " + projectTitle;
			btnEdit.className = "project-btn-edit " + projectTitle;
			btnDelete.className = "project-btn-delete " + projectTitle;
			h4Description.className = "project-description " + projectTitle;
			/* This elemets are for editing the project */
			inputTitle.className = "project-title-input " + projectTitle;
			inputDescription.className = "project-description-input " + projectTitle;
			btnOk.className = "project-btn-ok " + projectTitle;
			/* Add Text to the elements */
			h2Title.innerHTML = projectsArr[i].getTitle();
			h4Description.innerHTML = projectsArr[i].getDescription();
			btnDelete.innerHTML = "D";
			btnEdit.innerHTML = "E";
			/* This elements is for editing the project
			 * Checking if the projects values are the default so we can
			 * get a better UX filling the input with previous values. */
			inputTitle.type = "text";
			inputTitle.placeholder = "Title";
			if(projectsArr[i].getTitle() != "Title"){
				inputTitle.value = projectsArr[i].getTitle();
			}
			inputTitle.required = true;
			inputDescription.placeholder = "Description";
			if(projectsArr[i].getDescription() != "Description"){
				inputDescription.value = projectsArr[i].getDescription();
			}
			inputDescription.required = true;
			btnOk.innerHTML = "OK";
			/* Add the elements into the containers */
			spanButtonsContainer.appendChild(btnEdit);
			spanButtonsContainer.appendChild(btnDelete);
			spanButtonsContainer.appendChild(btnOk); // For editing the project
			spanTitleContainer.appendChild(h2Title);
			spanTitleContainer.appendChild(inputTitle); // For editing the project
			spanTitleContainer.appendChild(spanButtonsContainer);
			spanProject.appendChild(spanTitleContainer);
			spanProject.appendChild(space);
			spanProject.appendChild(h4Description);
			spanProject.appendChild(inputDescription); // For editing the project
			/* Set events */
			setProjectClickEvent(spanProject, btnEdit, btnDelete, btnOk);
			/* And add to our body */
			projectsBody.appendChild(spanProject);

			/* Click edit if the project is new */
			if(projectsArr[i].getTitle() == "Title" &&
			   projectsArr[i].getDescription() == "Description"){
				btnEdit.click();
			}
		}
	}

	const renderEditProject = (divProject) => {
		/* We hide the elements we don't need
		 * and display the ones that we need. */
		divProject.className += " edit";
	}

	const getFormValues = (index, divProject) => {
		let title = divProject.children[0].children[1].value;
		let description = divProject.children[3].value;
		if(title === "" && description === ""){
			alert("Please enter a Title and a Description");
		}else{
			Index.updateProject(index, title, description);
		}
	}

	const setTodoClickEvent = (edit, del, ok) => {
		edit.addEventListener("click", function (e) {
			// Disable add buttons
			let newTodo = document.getElementById("add-todo");
			newTodo.disabled = true;
			Index.editTodo(e.target.parentNode.parentNode.parentNode);
		}, false);
		del.addEventListener("click", function (e) {
			Index.deleteTodo(e.target.className);
		}, false);
		ok.addEventListener("click", function (e) {
			// Enable add buttons
			let newTodo = document.getElementById("add-todo");
			newTodo.disabled = false;
			getTodoFormValues(e.target.className, e.target.parentNode.parentNode.parentNode);
		}, false)
	}

	const renderTodosHeader = (index) => {
		let addTodo = document.createElement("button");
		addTodo.innerHTML = "New Todo";
		addTodo.className = "button";
		addTodo.id = "add-todo";
		setNewTodoButtonEvent(addTodo, index);
		if(itemsHeader.appendChild(addTodo))
			return true;
	}

	const renderTodosFromProject = (index) => {
		clearDiv(items);
		clearDiv(itemsHeader);
		items.appendChild(itemsHeader);
		items.appendChild(itemsBody);
		clearDiv(itemsBody);

		if(index != null){
			/* We use index to get the project from the projects array */
			let project = Index.getProjects()[index];
			let todosArr = project.getTodos();
			renderTodosHeader(index);
			for(let i = 0; i < todosArr.length; i++){
				let todoTitle = todosArr[i].getTitle() + i;
				/* Create elements */
				let divTodo = document.createElement("div");
				let spanTitleContainer = document.createElement("span");
				let h2Title = document.createElement("h2");
				let spanButtonsContainer = document.createElement("span");
				let btnEdit = document.createElement("button");
				let btnDelete = document.createElement("button");
				let space = document.createElement("hr");
				let h4Description = document.createElement("h4");
				let h4DueDate = document.createElement("h4");
				/* This elements are for editing the todo item */
				let inputTitle = document.createElement("input");
				let inputDescription = document.createElement("textarea");
				let divOptions = document.createElement("div");
				let labelDueDate = document.createElement("label");
				let inputDueDate = document.createElement("input");
				let labelPriority = document.createElement("label");
				let inputPriority = document.createElement("select");
				let inputNotes = document.createElement("textarea");
				let btnOk = document.createElement("button");
				/* Set attributes to elements */
				divTodo.className = "todo-container " + todoTitle + " " + todosArr[i].getPriority();
				spanTitleContainer.className = "todo-title-container " + todoTitle;
				h2Title.className = "todo-title " + todoTitle;
				spanButtonsContainer.className = "todo-buttons-container " + todoTitle;
				btnEdit.className = "todo-btn-edit " + todoTitle;
				btnDelete.className = "todo-btn-delete " + todoTitle;
				h4Description.className = "todo-description " + todoTitle;
				h4DueDate.className = "todo-due-date " + todoTitle;
				/* This elements are for editing the todo item */
				inputTitle.className = "todo-title-input " + todoTitle;
				inputTitle.type = "text";
				inputTitle.placeholder = "Title";
				inputTitle.required = true;
				inputDescription.className = "todo-description-input " + todoTitle;
				inputDescription.placeholder = "Description";
				inputDescription.required = true;
				divOptions.className = "todo-options-container " + todoTitle;
				labelDueDate.className = "todo-due-date-label " + todoTitle;
				labelDueDate.for = "due-date";
				inputDueDate.className = "todo-due-date-input " + todoTitle;
				inputDueDate.name = "due-date";
				inputDueDate.type = "date";
				inputDueDate.required = true;
				labelPriority.className = "todo-priority-label " + todoTitle;
				labelPriority.for = "priority";
				inputPriority.className = "todo-priority-input " + todoTitle;
				inputPriority.name = "priority";
				inputPriority.required = true;
				inputNotes.className = "todo-notes-input " + todoTitle;
				inputNotes.placeholder = "Notes";
				btnOk.className = "todo-btn-ok " + todoTitle;
				/* Add Text to the elements */
				h2Title.innerHTML = todosArr[i].getTitle();
				h4Description.innerHTML = todosArr[i].getDescription();
				h4DueDate.innerHTML = todosArr[i].getDueDate();
				btnDelete.innerHTML = "D";
				btnEdit.innerHTML = "E";
				/* This elements are for editing the todo item
				 * Checking if the projects values are the default so we can
				 * get a better UX filling the input with previous values. */
				labelDueDate.innerHTML = "Due Date : ";
				labelPriority.innerHTML = "Priority : ";
				btnOk.innerHTML = "OK";
				if(todosArr[i].getTitle() != "Title"){
					inputTitle.value = todosArr[i].getTitle();
				}
				if(todosArr[i].getDescription() != "Description"){
					inputDescription.value = todosArr[i].getDescription();
				}
				if(todosArr[i].getDueDate() != "Date"){
					inputDueDate.value = todosArr[i].getDueDate();
				}
				if(todosArr[i].getNotes().length > 0){
					inputNotes.value = todosArr[i].getNotes();
				}
				/* Add them to the Parent */
				spanButtonsContainer.appendChild(btnEdit);
				spanButtonsContainer.appendChild(btnDelete);
				spanButtonsContainer.appendChild(btnOk);
				spanTitleContainer.appendChild(h2Title);
				spanTitleContainer.appendChild(inputTitle);
				spanTitleContainer.appendChild(spanButtonsContainer);
				divTodo.appendChild(spanTitleContainer);
				divTodo.appendChild(space);
				divTodo.appendChild(h4Description);
				divTodo.appendChild(inputDescription);
				divTodo.appendChild(h4DueDate);
				divOptions.appendChild(labelDueDate);
				divOptions.appendChild(inputDueDate);
				divOptions.appendChild(labelPriority);
				/* Populate Priorities */
				for(let i = 0; i < todoPriorities.length; i++){
					let priorityItem = document.createElement("option");
					priorityItem.className = "todo-priority-option " + todoTitle;
					priorityItem.value = todoPriorities[i];
					priorityItem.innerHTML = todoPriorities[i];
					inputPriority.appendChild(priorityItem);
				}
				divOptions.appendChild(inputPriority);
				divTodo.appendChild(divOptions);
				if(todosArr[i].getNotes().lenght > 0){
					let notes = document.createElement("span");
					notes.className = "todo-notes " + todoTitle;
					for(let j = 0; i < todosArr[i].getNotes().length; j++){
						let note = document.createElement("p");
						note.className = "todo-note " + todoTitle;
						notes.appendChild(note);
					}
					divTodo.appendChild(notes);
				}
				divTodo.appendChild(inputNotes);
				/* Set events */
				setTodoClickEvent(btnEdit, btnDelete, btnOk);
				/* And add to our body */
				itemsBody.appendChild(divTodo);

				/* Click edit if the project is new */
				if(todosArr[i].getTitle() == "Title" &&
				   todosArr[i].getDescription() == "Description" &&
				   todosArr[i].getDueDate() == "Date"){
					btnEdit.click();
				}
			}
		}
	}

	const renderEditTodo = (divTodo) => {
		/* We hide the elements we don't need
		 * and display the ones that we need. */
		divTodo.className += " edit-todo";
	}


	const renderFooter = () => {
		let footerLinks = document.createElement("ul");
		let linkToCode = document.createElement("li");
		let linkToCodeIcon = document.createElement("i");
		linkToCodeIcon.className = "fa fa-code";
		linkToCode.appendChild(linkToCodeIcon);
		footerLinks.appendChild(linkToCode);
		footer.appendChild(footerLinks);
	}

	/* Set id to use inside the stylesheet */
	const setStyle = () => {
		body.id = "site-body";
		main.id = "site-main";
		projectsHeader.id = "site-projects-header";
		projectsBody.id = "site-projects-body";
		projects.id = "site-projects";
		itemsHeader.id = "site-items-header";
		itemsBody.id = "site-items-body";
		items.id = "site-items";
		footer.id = "site-footer";
	}

	const init = () => {
		populatePage();
		setStyle();
	}

	return { init, renderProjects, renderTodosFromProject, renderEditProject,
			 renderEditTodo };
})();

export { Dom };
