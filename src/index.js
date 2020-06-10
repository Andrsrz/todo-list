import { Dom } from './dom.js';
import { Project } from './project.js';
import { Item } from './item.js';

const Index = (() => {
	var projects = [];

	const addProject = (project) => {
		projects.push(project);
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

	const getTodosFromProject = (elementClass) => {
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
		console.log(id);
		/* We get the project's index sorted previously */
		Dom.renderTodosFromProject(id[id.length - 1]);
	}

	const render = () => {
		Dom.init();
	}

	return { render, getProjects, generateNewProject, getTodosFromProject, generateNewTodo };
})();
export { Index };

Index.render();
