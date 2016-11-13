
const data = [{id: 60001, name: "走客-服务号", wechat_id: "zouke-test", type: "", o_id: 'id', number: 22, xxx: 'xxx'}, 
            {id: 60002, name: "行程定制-服务号", wechat_id: "zktravel", type: "", o_id: 'id', number: 22, xxx: 'xxx'},
            {id: 60003, name: "走客-服务号", wechat_id: "myzouke", type: "service", o_id: 'id', number: 22, xxx: 'xxx'}];

const initState = {
	data: data
}

export function zk_accout(state=initState, action){
	switch (action.type){
		case 'get_account':
			return Object.assign({}, state, {});
		break;
		default:
			return state;
		break;
	}
}