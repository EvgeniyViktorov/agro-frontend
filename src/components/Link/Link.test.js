import React from 'react';
import renderer from 'react-test-renderer';

import Link from './Link';

test('Link changes the class when hovered', () => {
	const component = renderer.create(
		<Link url="http://www.google.com">Google</Link>,
	);
	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// manually trigger the callback
	console.log(1111, tree.props, tree.props.href);
	tree.props.onClick();
	// re-rendering
	tree = component.toJSON();
	expect(tree).toMatchSnapshot();

	// // manually trigger the callback
	// tree.props.onMouseLeave();
	// // re-rendering
	// tree = component.toJSON();
	// expect(tree).toMatchSnapshot();
});