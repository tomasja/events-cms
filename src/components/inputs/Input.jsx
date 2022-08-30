import React from 'react';
import './input.scss';

const Input = ({ className, type, name, onChange, placeholder, required }) => {
	return (
		<input
			className={className}
			type={type}
			name={name}
			onChange={onChange}
			placeholder={placeholder}
			required={required}
		/>
	);
};

export default Input;
