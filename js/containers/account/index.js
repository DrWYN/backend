// account 帐号管理
import React, {Component} from 'react';
import { Table, Button, Icon } from 'antd';

import { connect } from 'react-redux';
import bindActions from '../../actions/bind';

import {Link} from 'react-router';


class Account extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        bindActions.getAccountData();
    }

    onChange(pagination, filters, sorter) {
      // 点击分页、筛选、排序时触发
      console.log('各类参数是', pagination, filters, sorter);
    }

    render(){
        const columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          sorter: (a, b) => a.id - b.id,
          render: (text) => <a href="#">{text}</a>,
        }, {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
        }, {
          title: '微信号',
          dataIndex: 'wechat_id',
          key: 'wechat_id',
          sorter: (a, b) => a.wechat_id.length - b.wechat_id.length,
        }, {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          sorter: (a, b) => a.type.length - b.type.length,
        }, {
          title: '原始id',
          dataIndex: 'o_id',
          key: 'o_id',
          sorter: (a, b) => a.o_id.length - b.o_id.length,
        }, {
          title: '关注人数',
          dataIndex: 'number',
          key: 'number',
          sorter: (a, b) => a.number - b.number,
        }, {
          title: 'xxx',
          dataIndex: 'xxx',
          key: 'xxx',
        }, {
          title: '操作',
          key: 'operation',
          render: (text, record) => (
            <span>
              <a href="#">操作一{/*record.name*/}</a>
              <span className="ant-divider"></span>
              <a href="#">操作二</a>
            </span>
          ),
        }];

        // 通过 rowSelection 对象表明需要行选择
        const rowSelection = {
          onChange(selectedRowKeys, selectedRows) {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          onSelect(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
          },
          onSelectAll(selected, selectedRows, changeRows) {
            console.log(selected, selectedRows, changeRows);
          },
        };

        const pagination = {
          total: this.props.data.length,
          showSizeChanger: true,
          onShowSizeChange(current, pageSize) {
            console.log('Current: ', current, '; PageSize: ', pageSize);
          },
          onChange(current) {
            console.log('Current: ', current);
          },
        };

        return (
            <div>
                <div>Account</div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.props.data} pagination={pagination} onChange={this.onChange.bind(this)}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    let {data} = state.zk_accout;
    return {
        data
    }
}

export default connect(mapStateToProps)(Account);





