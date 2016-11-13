// attention 关注消息
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import { connect } from 'react-redux';
import bindActions from '../../actions/bind';

import {Link} from 'react-router';
import './attention.scss';

import { Button, Table, Select, Collapse, Icon, Modal, Input, message } from 'antd';

const Option = Select.Option;


export default class Attention extends Component{
    constructor(props){
        super(props);
    }

    handleSelectChange(value){
      console.log(`select ${value}`);
    }

    render(){
        let accounts = [{id: 1, name: "走客服务号"}, {id: 2, name: "行程定制服务号"}, {id: 3, name: "行程规划订阅号"}];
        return (
            <div className="attention-page-container">
                <div className="choose-account">
                  <Select
                    showSearch
                    style={{width: 200}}
                    plactholder="选择一个公众号"
                    optionFilterProp="children"
                    onChange={this.handleSelectChange}
                    notFoundContent="">
                    {
                      accounts.map((account, index)=>{
                        return (<Option key={index} value={account.id.toString()}>{account.name}</Option>)
                      })
                    }
                  </Select>
                </div>
                <div className="table-container">
                  <div>
                    <Button>文字回复</Button>
                    <Button>图文回复</Button>
                  </div>
                </div>
            </div>
        );
    }
}





