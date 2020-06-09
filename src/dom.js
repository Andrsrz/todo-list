import './style/style.css';

const Dom = (() => {
	const body = document.body;
	const main = document.createElement("main");
	const footer = document.createElement("footer");

	const populatePage = () => {
		body.appendChild(main);
		body.appendChild(footer);
	}

	const setStyle = () => {
		body.id = "site-body";
		main.id = "site-main;"
		footer.id = "site-footer";
	}

	const init = () => {
		populatePage();
		setStyle();
	}

	return { init };
})();

export { Dom };
