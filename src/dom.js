import { Index } from './index.js';
import './style/style.css';

const Dom = (() => {
	const body = document.body;
	const main = document.createElement("main");
	const projectsHeader = document.createElement("div");
	const projectsBody = document.createElement("div");
	const projects = document.createElement("div");
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
	const clearProjectsDiv = () => {
		while(projectsBody.firstChild){
			projectsBody.removeChild(projectsBody.firstChild);
		}
	}

	const setProjectClickEvent = (span) => {
		span.addEventListener("click", function (e) {
			Index.getTodosFromProject(e);
		}, false);
	}

	/* Render the projects from the projects array */
	const renderProjects = (projectsArr) => {
		clearProjectsDiv();
		for(let i = 0; i < projectsArr.length; i++){
			let spanProject = document.createElement("span");
			spanProject.className = "project-container " + projectsArr[i].getTitle() + i;
			let h2Title = document.createElement("h2");
			h2Title.className = "project-title " + projectsArr[i].getTitle() + i;
			let space = document.createElement("hr");
			let h4Description = document.createElement("h4");
			h4Description.className = "project-description " + projectsArr[i].getTitle() + i;
			h2Title.innerHTML = projectsArr[i].getTitle();
			h4Description.innerHTML = projectsArr[i].getDescription();
			spanProject.appendChild(h2Title);
			spanProject.appendChild(space);
			spanProject.appendChild(h4Description);
			setProjectClickEvent(spanProject);
			projectsBody.appendChild(spanProject);
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
		items.id = "site-items";
		footer.id = "site-footer";
	}

	const init = () => {
		populatePage();
		setStyle();
	}

	return { init, renderProjects };
})();

export { Dom };
