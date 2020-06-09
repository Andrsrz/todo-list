import { Dom } from './dom.js';
import { Project } from './project.js';

const Index = (() => {

	const render = () => {
		Dom.init();
		let projects = [];
		let project1 = Project();
		project1.setTitle("Title Test");
		project1.setDescription("Description Test");
		projects.push(project1);
		Dom.renderProjects(projects);
	}

	return { render };
})();

Index.render();
