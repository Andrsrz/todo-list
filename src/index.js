import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { Dom } from './dom.js';
import { Project } from './project.js';
import { Item } from './item.js';

const Index = (() => {
	var projects = [];

	const saveToStorage = () => {
		localStorage.setItem('projectsArr', JSON.stringify(Index.projects, null, 4));
		getFromStorage();
	}

	const getFromStorage = () => {
		let storage = false;
		clearProjects();

		let projectsLocalStorage = localStorage.getItem('projectsArr');
		let projectsFromLocalStorage = JSON.parse(projectsLocalStorage);

		if(projectsFromLocalStorage != null){
			for(let i = 0; i < projectsFromLocalStorage.length; i++){
				storage = true;
				/* Get attributes from the JSON */
				let project = new Project();
				project.setTitle(projectsFromLocalStorage[i].title);
				project.setDescription(projectsFromLocalStorage[i].description);
				project.setTodos(projectsFromLocalStorage[i].todos);
				addProject(project);
			}
		}

		return storage;
	}

	const defaultProject = () => {
		let defaultProject = new Project("Default", "Project Description");
		addProject(defaultProject);
		saveToStorage();
	}

	const clearProjects = () => {
		for(let i = Index.projects.length; i > 0; i--){
			console.log(Index.projects.length);
			Index.projects.pop();
			console.log(Index.projects.length);
		}
	}

	const addProject = (project) => {
		Index.projects.push(project);
	}

	const removeProject = (index) => {
		Index.projects.splice(index, 1);
		saveToStorage();
	}

	const generateNewProject = () => {
		let project = new Project();
		addProject(project);
		Dom.renderProjects(projects);
	}

	const generateNewTodo = (index) => {
		/* Create New Todo */
		let todo = new Item();
		todo.setProjectId(index);
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
		saveToStorage();
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
		if(!getFromStorage() && Index.projects.length == 0){
			defaultProject();
		}
		Dom.init();
		Dom.renderProjects(projects);
	}

	return { render, projects, generateNewProject, getTodosFromProject, generateNewTodo,
			 editProject, updateProject, deleteProject, editTodo, updateTodo, deleteTodo };
})();
export { Index };

Index.render();
