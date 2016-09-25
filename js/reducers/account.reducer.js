
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `李大嘴${i}`,
    age: 32,
    address: `西湖区湖底公园${i}号`,
  });
}

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