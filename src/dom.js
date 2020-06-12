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
	const githubpage = "https://github.com/Andrsrz/todo-list";
	const reportbugpage = "https://github.com/Andrsrz/todo-list/issues/new";

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
			let btnEdit = document.createElement("span");
			let iconEdit = document.createElement("span");
			let btnDelete = document.createElement("span");
			let iconDelete = document.createElement("span");
			let space = document.createElement("hr");
			let h4Description = document.createElement("h4");
			/* This elements are for editing the project */
			let inputTitle = document.createElement("input");
			let inputDescription = document.createElement("textarea");
			let btnOk = document.createElement("span");
			let iconOk = document.createElement("span");
			/* Set attributes. */
			spanProject.className = "project-container " + projectTitle;
			spanTitleContainer.className = "project-title-container " + projectTitle;
			h2Title.className = "project-title " + projectTitle;
			spanButtonsContainer.className = "project-buttons-container " + projectTitle;
			btnEdit.className = "project-btn-edit " + projectTitle;
			btnEdit.title = "Edit";
			iconEdit.className = "fas fa-pencil-alt";
			btnDelete.className = "project-btn-delete " + projectTitle;
			btnDelete.title = "Delete";
			iconDelete.className = "fas fa-trash";
			h4Description.className = "project-description " + projectTitle;
			/* This elemets are for editing the project */
			inputTitle.className = "project-title-input " + projectTitle;
			inputDescription.className = "project-description-input " + projectTitle;
			btnOk.className = "project-btn-ok " + projectTitle;
			btnOk.title = "Done";
			iconOk.className = "far fa-check-circle";
			/* Add Text to the elements */
			h2Title.innerHTML = projectsArr[i].getTitle();
			h4Description.innerHTML = projectsArr[i].getDescription();
			/* This elements is for editing the project
			 * Checking if the projects values are the default so we can
			 * get a better UX filling the input with previous values. */
			inputTitle.type = "text";
			inputTitle.placeholder = "Title";
			if(projectsArr[i].title != "Title"){
				inputTitle.value = projectsArr[i].getTitle();
			}
			inputTitle.required = true;
			inputDescription.placeholder = "Description";
			if(projectsArr[i].description != "Description"){
				inputDescription.value = projectsArr[i].getDescription();
			}
			inputDescription.required = true;
			/* Add the elements into the containers */
			btnEdit.appendChild(iconEdit);
			spanButtonsContainer.appendChild(btnEdit);
			btnDelete.appendChild(iconDelete);
			spanButtonsContainer.appendChild(btnDelete);
			btnOk.appendChild(iconOk);
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
			   projectsArr[i].getDscription() == "Description"){
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

	const setTodoClickEvent = (edit, del, ok, projectId) => {
		edit.addEventListener("click", function (e) {
			// Disable add buttons
			let newTodo = document.getElementById("add-todo");
			newTodo.disabled = true;
			Index.editTodo(e.target.parentNode.parentNode.parentNode);
		}, false);
		del.addEventListener("click", function (e) {
			Index.deleteTodo(projectId, e.target.className);
		}, false);
		ok.addEventListener("click", function (e) {
			// Enable add buttons
			let newTodo = document.getElementById("add-todo");
			newTodo.disabled = false;
			getTodoFormValues(projectId, e.target.className, e.target.parentNode.parentNode.parentNode);
		}, false)
	}

	const renderTodosHeader = (index) => {
		let addTodo = document.createElement("button");
		addTodo.innerHTML = "New Todo";
		addTodo.className = "button " + index;
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
			let project = Index.projects[index];
			let todosArr = project.getTodos();
			renderTodosHeader(index);
			for(let i = 0; i < todosArr.length; i++){
				let todoTitle = todosArr[i].getTitle() + i;
				/* Create elements */
				let divTodo = document.createElement("div");
				let spanTitleContainer = document.createElement("span");
				let h2Title = document.createElement("h2");
				let spanButtonsContainer = document.createElement("span");
				let btnEdit = document.createElement("span");
				let iconEdit = document.createElement("span");
				let btnDelete = document.createElement("span");
				let iconDelete = document.createElement("span");
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
				let btnOk = document.createElement("span");
				let iconOk = document.createElement("span");
				/* Set attributes to elements */
				divTodo.className = "todo-container " + todoTitle + " " + todosArr[i].getPriority();
				/* Set div border color from priority */
				let todoPriority = todosArr[i].getPriority();
				switch(todoPriority){
					case 'High':
						divTodo.className += " high";
						break;
					case 'Neutral':
						divTodo.className += " neutral";
						break;
					case 'Low':
						divTodo.className += " low";
						break;
				}
				spanTitleContainer.className = "todo-title-container " + todoTitle;
				h2Title.className = "todo-title " + todoTitle;
				spanButtonsContainer.className = "todo-buttons-container " + todoTitle;
				btnEdit.className = "todo-btn-edit " + todoTitle;
				btnEdit.title = "Edit";
				iconEdit.className = "fas fa-pencil-alt";
				btnDelete.className = "todo-btn-delete " + todoTitle;
				btnDelete.title = "Delete";
				iconDelete.className = "fas fa-trash";
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
				btnOk.title = "Done";
				iconOk.className = "far fa-check-circle";
				/* Add Text to the elements */
				h2Title.innerHTML = todosArr[i].title;
				h4Description.innerHTML = todosArr[i].description;
				h4DueDate.innerHTML = todosArr[i].dueDate;
				/* This elements are for editing the todo item
				 * Checking if the projects values are the default so we can
				 * get a better UX filling the input with previous values. */
				labelDueDate.innerHTML = "Due Date : ";
				labelPriority.innerHTML = "Priority : ";
				if(todosArr[i].getTitle() != "Title"){
					inputTitle.value = todosArr[i].getTitle();
				}
				if(todosArr[i].getDescription() != "Description"){
					inputDescription.value = todosArr[i].getDescription();
				}
				if(todosArr[i].getDueDate() != "Date"){
					inputDueDate.value = todosArr[i].getDueDate();
				}
				if(todosArr[i].getNotes() != "No Notes"){
					inputNotes.value = todosArr[i].getNotes();
				}
				/* Add them to the Parent */
				btnEdit.appendChild(iconEdit);
				spanButtonsContainer.appendChild(btnEdit);
				btnDelete.appendChild(iconDelete);
				spanButtonsContainer.appendChild(btnDelete);
				btnOk.appendChild(iconOk);
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
				for(let j = 0; j < todoPriorities.length; j++){
					let priorityItem = document.createElement("option");
					priorityItem.className = "todo-priority-option " + todoTitle;
					priorityItem.value = todoPriorities[j];
					priorityItem.innerHTML = todoPriorities[j];
					if(todoPriorities[j] == todosArr[i].getPriority()){
						priorityItem.selected = "selected";
					}
					inputPriority.appendChild(priorityItem);
				}
				divOptions.appendChild(inputPriority);
				divTodo.appendChild(divOptions);
				if(todosArr[i].getNotes() != "No Notes"){
					let notes = document.createElement("span");
					notes.className = "todo-notes " + todoTitle;
					divTodo.appendChild(notes);
				}
				divTodo.appendChild(inputNotes);
				/* Set events */
				setTodoClickEvent(btnEdit, btnDelete, btnOk, index);
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

	const getTodoFormValues = (projectId, todoId, divTodo) => {
		let title = divTodo.children[0].children[1].value;
		let description = divTodo.children[3].value;
		let date = divTodo.children[5].children[1].value;
		let priority = divTodo.children[5].children[3].value;
		let notes = divTodo.children[6].value;
		if(title === "" || description === "" || date === "" || priority === ""){
			alert("Please enter all required values");
		}else{
			Index.updateTodo(projectId, todoId, title, description, date, priority, notes);
		}
	}

	const setFooterIconOnClickEvent = (goToCode, goToReportBug) => {
		goToCode.addEventListener("click", function () {
			window.open(githubpage, '_blank');
		}, false);
		goToReportBug.addEventListener("click", function () {
			window.open(reportbugpage, '_blank');
		}, false);
	}

	const renderFooter = () => {
		let footerLinks = document.createElement("ul");
		let linkToCode = document.createElement("li");
		let linkToCodeIcon = document.createElement("span");
		let linkToReportBug = document.createElement("li");
		let linkToReportBugIcon = document.createElement("span");
		linkToCode.title = "Show me the code";
		linkToCode.className = "code-icon";
		linkToCodeIcon.className = "fas fa-code";
		linkToReportBug.title = "OMG! I found a bug!";
		linkToReportBug.className = "bug-icon";
		linkToReportBugIcon.className = "fas fa-bug";
		setFooterIconOnClickEvent(linkToCode, linkToReportBug);
		linkToCode.appendChild(linkToCodeIcon);
		linkToReportBug.appendChild(linkToReportBugIcon);
		footerLinks.appendChild(linkToCode);
		footerLinks.appendChild(linkToReportBug);
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
