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

	return { init };
})();

export { Dom };
