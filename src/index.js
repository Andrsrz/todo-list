import { Dom } from './dom.js';
import { Project } from './project.js';

const Index = (() => {
	var projects = [];

	const generateNewProject = () => {
		let project = Project();
		projects.push(project);
		Dom.renderProjects(projects);
	}

	const getTodosFromProject = (element) => {
		let elementClass = element.target.className;
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
	}

	const render = () => {
		Dom.init();
	}

	return { render, generateNewProject, getTodosFromProject };
})();
export { Index };

Index.render();
