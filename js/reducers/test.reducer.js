
const initState = {
	text: ''
}

export function test(state=initState, action){
	switch (action.type){
		case 'text_action':
			return Object.assign({}, state, {text: action.text});
		break;
		case 'api_action':
			return Object.assign({}, state, {text: action.content});
		break;
		case 'error':
			return Object.assign({}, state, {text: action.error});
		break;
		default:
			return state;
		break;
	}
}