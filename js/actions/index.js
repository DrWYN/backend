import * as testAction from './test.action';
import * as accountAction from './account.action';

import Util from '../utils/Util';

let actions = Object.assign(
        {},
        testAction,
        accountAction,
);


// 如果有重复key就抛出错误
if(
    !Util.keysDupliCheck(
        actions,
        testAction,
        accountAction,
    )
){
    throw new Error("Actions Keys Duplicated!");
}

export default actions;
