const clone = require('clone');

const data = {
    accounts: [{id: 1, name: "走客服务号"}, {id: 2, name: "行程定制服务号"}, {id: 3, name: "行程规划订阅号"}],
    menus: {button:[
        {type: "view", name: "主菜单1", url: "", key: "", sub_button: []},
        {type: "view", name: "主菜单2", url: "", key: "", sub_button: [
            {type: "view", name: "子菜单21", url: "", key: ""}
        ]},
        ]}
};

const initState = {
	data: data
}

export function zk_menu(state=initState, action){
	switch (action.type){
		case 'get_menu':
			return Object.assign({}, state, {});
        case 'add_menu':
        {
            let tmpState = clone(state);
            let {menus} = tmpState.data;
            let addTmp = {
                type: "view",
                name: action.name,
                url: "",
                key: ""
            }
            if(action.level === 1){//添加主菜单
                addTmp.sub_button = [];
                menus.button.push(addTmp);
            }else if(action.level === 2){//添加二级菜单
                menus.button[action.addIndex].sub_button.push(addTmp);
            }
            return Object.assign({}, state, tmpState);
        }
        case 'del_menu':
        {
            let tmpState = clone(state);
            let {menus} = tmpState.data;
            if(action.level === 1){ //删除主菜单
                menus.button.splice(action.topIndex, 1);
            }else if(action.level === 2){   //删除二级菜单
                menus.button[action.topIndex].sub_button.splice(action.secIndex, 1);
            }
            return Object.assign({}, state, tmpState);
        }
        case 'edit_menu':
        {
            let tmpState = clone(state);
            let {menus} = tmpState.data;
            if(action.level === 1){ //编辑主菜单
                menus.button[action.topIndex] = Object.assign({}, menus.button[action.topIndex], action.data);
            }else if(action.level === 2){   //编辑二级菜单
                menus.button[action.topIndex].sub_button[action.secIndex] = Object.assign({}, menus.button[action.topIndex].sub_button[action.secIndex], action.data);
            }
            return Object.assign({}, state, tmpState);
        }
		default:
			return state;
	}
}