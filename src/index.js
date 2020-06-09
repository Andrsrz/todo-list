import myName from './myName.js';

function component() {
	const element = document.createElement('div');

	// Using my function
	element.innerHTML = myName('Andres');
	return element;
}

document.body.appendChild(component());
