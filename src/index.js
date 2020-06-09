import { Dom } from './dom.js';
import { Project } from './project.js';

const Index = (() => {
	var projects = [];

	const generateNewProject = () => {
		let project = Project();
		projects.push(project);
		Dom.renderProjects(projects);
	}

	const printHelloOnClick = () => {
		console.log("Hello");
	}

	const render = () => {
		Dom.init();
	}

	return { render, generateNewProject, printHelloOnClick };
})();
export { Index };

Index.render();
