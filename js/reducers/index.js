import { combineReducers } from 'redux';
import Util from '../utils/Util';

import * as test from './test.reducer';
import * as account from './account.reducer';

let reducers = Object.assign(
        {},
        test,
        account
);

// 如果有重复key就抛出错误
if(
    !Util.keysDupliCheck(
        reducers,
        test,
        account
    )
){

    throw new Error("Reducers Keys Duplicated!");
}

const rootReducer = combineReducers(reducers);

export default rootReducer;