import {CALL_API} from '../middleware/api';

export function getAccountData(){
	return {type: 'get_account'};
}