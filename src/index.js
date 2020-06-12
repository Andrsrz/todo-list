import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { Dom } from './dom.js';
import { Project } from './project.js';
import { Item } from './item.js';

const Index = (() => {
	var projects = [];

	const storageAvailable = (type) => {
		var storage;
		try {
			storage = window[type];
			var x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				// everything except Firefox
				e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// acknowledge QuotaExceededError only if there's something already stored
				(storage && storage.length !== 0);
		}
	}

	const saveToStorage = () => {
		localStorage.setItem('projectsArr', JSON.stringify(projects, null, 4));
		getFromStorage();
	}

	const getFromStorage = () => {
		let storage = false;
		// projects = [];

		let projectsLocalStorage = localStorage.getItem('projectsArr');
		console.log(projectsLocalStorage);
		let projectsFromLocalStorage = JSON.parse(projectsLocalStorage);

		// if(projectsFromLocalStorage != null){
		// 	for(let i = 0; i < projectsFromLocalStorage.length; i++){
		// 		console.log(projectsFromLocalStorage[i].title);
		// 		console.log(projectsFromLocalStorage[i].description);
		// 		console.log(projectsFromLocalStorage[i].todos);
		// 		storage = true;
		// 		/* Get attributes from the JSON */
		// 		let project = Project();
		// 		project.setTitle(projectsFromLocalStorage[i].title);
		// 		project.setDescription(projectsFromLocalStorage[i].description);
		// 		// project.setTodos(projects[i].todos);
		// 		projects.push(project);
		// 	}
		// }

		return storage;
	}

	const checkLocalStorage = () => {
		if(storageAvailable('localStorage')){
			getFromStorage();
		}else {
			alert("WARNING! Your browser doesn't support local storage. To use this app \
				change the browser.");
		}
	}

	const defaultProject = () => {
		let defaultProject = new Project("Default", "Project Description");
		addProject(defaultProject);
		// saveToStorage();
	}

	const addProject = (project) => {
		projects.push(project);
	}

	const removeProject = (index) => {
		projects.splice(index, 1);
	}

	const generateNewProject = () => {
		let project = Project();
		addProject(project);
		Dom.renderProjects(projects);
	}

	const generateNewTodo = (index) => {
		/* Create New Todo */
		let todo = new Item();
		todo.setProjectId(index);
		console.log(todo);
		projects[index].addTodo(todo);
		Dom.renderTodosFromProject(index);
	}

	const getProjectIndex = (elementClass) => {
		let id = "";
		/* With this procedure we get the id from the
		 * element, sorting the array and getting everything
		 * after the space. */
		for(let i = 0; i < elementClass.length; i++){
			if(elementClass[i] == " "){
				for(let j = i; j < elementClass.length; j++){
					id += elementClass[j];
				}
				break;
			}
		}
		return id[id.length - 1];
	}

	const getTodosFromProject = (elementClass) => {
		let id = getProjectIndex(elementClass);
		/* We get the project's index sorted previously */
		Dom.renderTodosFromProject(id);
	}

	const editProject = (divProject) => {
		Dom.renderEditProject(divProject);
	}

	const updateProject = (elementClass, title, description) => {
		let id = getProjectIndex(elementClass);
		projects[id].setTitle(title);
		projects[id].setDescription(description);
		Dom.renderProjects(projects);
	}

	const deleteProject = (elementClass) => {
		let id = getProjectIndex(elementClass);
		removeProject(id);
		Dom.renderProjects(projects);
		Dom.renderTodosFromProject(null);
	}

	const editTodo = (divTodo) => {
		Dom.renderEditTodo(divTodo);
	}

	const updateTodo = (projectId, buttonClass, title, description, dueDate, priority, notes) => {
		let todoId = getProjectIndex(buttonClass);
		projects[projectId].updateTodo(todoId, title, description, dueDate, priority, notes);
		Dom.renderTodosFromProject(projectId);
	}

	const deleteTodo = (projectId, buttonClass) => {
		let todoId = getProjectIndex(buttonClass);
		projects[projectId].removeTodo(todoId);
		Dom.renderTodosFromProject(projectId);
	}

	const render = () => {
		defaultProject();
		Dom.init();
		Dom.renderProjects(projects);
	}

	return { render, projects, generateNewProject, getTodosFromProject, generateNewTodo,
			 editProject, updateProject, deleteProject, editTodo, updateTodo, deleteTodo };
})();
export { Index };

Index.render();
