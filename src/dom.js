import './style/style.css';

const Dom = (() => {
	const body = document.body;
	const main = document.createElement("main");
	const projects = document.createElement("div");
	const items = document.createElement("div");
	const footer = document.createElement("footer");

	const populatePage = () => {
		main.appendChild(projects);
		main.appendChild(items);
		body.appendChild(main);
		body.appendChild(footer);
	}

	const renderProjects = (projectsArr) => {
		for(let i = 0; i < projectsArr.length; i++){
			let spanProject = document.createElement("span");
			spanProject.className = "project-container";
			let h2Title = document.createElement("h2");
			h2Title.className = "project-title"
			let h4Description = document.createElement("h4");
			h4Description.className = "project-description";
			h2Title.innerHTML = projectsArr[i].getTitle();
			h4Description.innerHTML = projectsArr[i].getDescription();
			spanProject.appendChild(h2Title);
			spanProject.appendChild(h4Description);
			projects.appendChild(spanProject);
		}
	}

	const setStyle = () => {
		body.id = "site-body";
		main.id = "site-main";
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
