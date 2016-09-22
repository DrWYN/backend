import {CALL_API} from '../middleware/api';

export function testAction(text){
	return {type: 'text_action', text:text};
}

export function apiAction(){
	return {
		    [CALL_API] : {
            types : ['api_action', null, null, 'error'],
            payload : {}
        }
	}
}