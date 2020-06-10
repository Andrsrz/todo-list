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
			Index.editProject(e.target.parentNode.parentNode.parentNode);
		}, false);
		del.addEventListener("click", function (e) {
			Index.deleteProject(e.target.className);
		}, false);
		ok.addEventListener("click", function (e) {
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
			/* This elements is for editing the project */
			inputTitle.placeholder = "Title";
			inputTitle.required = true;
			inputDescription.placeholder = "Description";
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
		console.log(divProject.className += " edit");
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

	const renderTodosHeader = (index) => {
		let addTodo = document.createElement("button");
		addTodo.innerHTML = "New Todo";
		addTodo.className = "button";
		addTodo.id = "add-todo-" + Index.getProjects()[index].getTitle();
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
				let divTodo = document.createElement("div");
				divTodo.className = "todo-container " + todosArr[i].getTitle() + i;
				let h2Title = document.createElement("h2");
				h2Title.className = "todo-title " + todosArr[i].getTitle() + i;
				let space = document.createElement("hr");
				let h4Description = document.createElement("h4");
				h4Description.className = "todo-description " + todosArr[i].getTitle() + i;
				let h4DueDate = document.createElement("h4");
				h4DueDate.className = "todo-due-date " + todosArr[i].getTitle() + i;
				h2Title.innerHTML = todosArr[i].getTitle();
				h4Description.innerHTML = todosArr[i].getDescription();
				h4DueDate.innerHTML = todosArr[i].getDueDate();
				divTodo.appendChild(h2Title);
				divTodo.appendChild(space);
				divTodo.appendChild(h4Description);
				divTodo.appendChild(h4DueDate);
				if(todosArr[i].getNotes().lenght > 0){
					let notes = document.createElement("span");
					notes.className = "todo-notes " + todosArr[i].getTitle() + i;
					for(let j = 0; i < todosArr[i].getNotes().length; j++){
						let note = document.createElement("p");
						note.className = "todo-note " + todosArr[i].getTitle() + i;
						notes.appendChild(note);
					}
					divTodo.appendChild(notes);
				}
				// setTodoClickEvent(divTodo);
				itemsBody.appendChild(divTodo);
			}
		}
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

	return { init, renderProjects, renderTodosFromProject, renderEditProject };
})();

export { Dom };
