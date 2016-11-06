import {CALL_API} from '../middleware/api';

//获取数据
export function getMenuData(){
	return {type: 'get_menu'};
}

/*
*添加菜单
*level -- 添加菜单级别
*addIndex -- 如果是二级菜单，在第几个上添加
*name -- 添加的name
*/
export function addMenu(level, addIndex, name){
    return {type: 'add_menu', level: level, addIndex: addIndex, name: name};
}
/*
*删除菜单
*level -- 删除菜单级别
*topIndex -- 删除一级菜单下标
*secIndex -- 删除二级菜单下标
*/
export function deleteMenu(level, topIndex, secIndex){
    return {type: 'del_menu', level, topIndex, secIndex};
}
/*
*编辑菜单
*level -- 编辑菜单级别
*topIndex -- 编辑一级菜单下标
*secIndex -- 编辑二级菜单下标
*data -- 改变后的数据
*/
export function editMenu(level, topIndex, secIndex, data){
    return {type: 'edit_menu', level, topIndex, secIndex, data};
}
