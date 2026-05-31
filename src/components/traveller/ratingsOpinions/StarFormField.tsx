import React from 'react';

import FILLED_STAR from '../../../public/images/ratings/filled-star.png'
import EMPTY_STAR from '../../../public/images/ratings/empty-star.png'

const StarFormField = ({ ...props }) => {

	const {mainClassName, onChange, name, value = 0 } = props;

	let emptyStars = [];
	let filledStars = [];
	for (let i = 0; i < value ; i++) {
		filledStars.push(<img src={FILLED_STAR} alt='filledStar'/>);
	};
	for (let i = 0; i < (5 - value); i++) {
		filledStars.push(<img src={EMPTY_STAR} alt='emptyStar'/>);
	}
	const allStars = [...filledStars, ...emptyStars];

	const _handleChangeOnStars = (index) => onChange(name, index);

	return (
		<React.Fragment>
			<div className={mainClassName}>{allStars.map((star, index) => <span key={index} style={{cursor: 'pointer', opacity: `calc(0.8 + ${index /10}`}} onClick={(e) => _handleChangeOnStars(index)}>{star}</span>)}</div>
		</React.Fragment>);
}

export default StarFormField;