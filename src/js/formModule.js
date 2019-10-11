import axios from 'axios'
import { setCSSProp } from './lib';

const formNode = document.querySelector('.contact_from');
const resultNode = document.querySelector('.submit_block__results');

const setFormResponse = ({status, message, data}) => {
		console.log(data);
		if (status) {
			setCSSProp('--result_color', '#d2e96c');
		} else {
			setCSSProp('--result_color', 'rgb(245, 106, 106)');
		}
		resultNode.classList.add('show_message');
		resultNode.textContent = message;
}

const validateForm = (email) => {
	const result = /.+@.+\..+/i.test(email);
	return {
		status: result,
		message: !result ? "E-mail field doesn't look right" : ''
	}
}

const submitFormData = (e) => {
	e.preventDefault();
	resultNode.classList.remove('show_message');
	const formData = {};
	// eslint-disable-next-line no-restricted-syntax
	for (const [key, value] of new FormData(e.target).entries()) {
		formData[key] = value;
	}

	const {status, message} = validateForm(formData.email);

	if (status) {
		setFormResponse({status: 'pending', message: 'Sending message'});
		axios({
			method: 'post',
			url: '/',
			headers: {
				'accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
				"Access-Control-Allow-Origin": "*",
			},
			mode: 'no-cors',
			data: formData
		}).then(({data}) => setFormResponse(data));
	} else {
		setFormResponse({status, message});
	}
	
	e.target.reset();
}

formNode.addEventListener('submit', submitFormData)