/**
 * External dependencies
 */
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { useLayoutEffect, useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getDefinitionForType } from '../../elements';

const Wrapper = styled.div``;

function Element( {
	isEditing,
	setNodeForElement,
	setClickHandler,
	handleSelectElement,
	element: {
		id,
		type,
		...rest
	},
} ) {
	const { Display, Edit } = getDefinitionForType( type );
	const element = useRef();
	const props = { ...rest, id };

	useLayoutEffect( () => {
		setNodeForElement( id, element.current );
	}, [ id, setNodeForElement ] );

	// Are we editing this element, display this as Edit component.
	if ( isEditing ) {
		return (
			<Wrapper
				ref={ element }
			>
				<Edit { ...props } />
			</Wrapper>
		);
	}

	return (
		<Wrapper
			onClick={ ( evt ) => handleSelectElement( id, evt ) }
			ref={ element }
		>
			<Display { ...props } setClickHandler={ setClickHandler } />
		</Wrapper>
	);
}

Element.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	setNodeForElement: PropTypes.func.isRequired,
	setClickHandler: PropTypes.func.isRequired,
	handleSelectElement: PropTypes.func.isRequired,
	element: PropTypes.object.isRequired,
};

export default Element;
