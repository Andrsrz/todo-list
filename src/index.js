import { Dom } from './dom.js';

const Index = (() => {

	const render = () => {
		Dom.init();
	}

	return { render };
})();

Index.render();
