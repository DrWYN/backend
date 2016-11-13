const clone = require('clone');

const data = {
    accounts: [{id: 1, name: "走客服务号"}, {id: 2, name: "行程定制服务号"}, {id: 3, name: "行程规划订阅号"}],
    messages: [{id: 60001, account: "走客-服务号", key_word: "zouke-test", type: "text", desc: 'id'}, 
            {id: 60002, account: "行程定制-服务号", key_word: "zktravel", type: "text", desc: 'id'},
            {id: 60003, account: "走客-服务号", key_word: "myzouke", type: "pic", desc: 'id'}]
};

const initState = {
    data: data
}

export function zk_keyword(state=initState, action){
    switch (action.type){
        case 'get_keyword':
            return Object.assign({}, state, {});
        break;
        default:
            return state;
        break;
    }
}