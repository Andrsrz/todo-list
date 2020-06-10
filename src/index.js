import { Dom } from './dom.js';
import { Project } from './project.js';
import { Item } from './item.js';

const Index = (() => {
	var projects = [];

	const addProject = (project) => {
		projects.push(project);
	}

	const removeProject = (index) => {
		projects.splice(index, 1);
	}

	const getProjects = () => projects;

	const generateNewProject = () => {
		let project = Project();
		addProject(project);
		Dom.renderProjects(projects);
	}

	const generateNewTodo = (index) => {
		/* Create New Todo */
		let todo = Item();
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

	const deleteProject = (elementClass) => {
		let id = getProjectIndex(elementClass);
		removeProject(id);
		Dom.renderProjects(projects);
	}

	const render = () => {
		Dom.init();
	}

	return { render, getProjects, generateNewProject, getTodosFromProject, generateNewTodo,
			 deleteProject };
})();
export { Index };

Index.render();
