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
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.length - b.name.length,
          render: (text) => <a href="#">{text}</a>,
        }, {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
          sorter: (a, b) => a.age - b.age,
        }, {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
          sorter: (a, b) => a.address.length - b.address.length,
        }, {
          title: '操作',
          key: 'operation',
          render: (text, record) => (
            <span>
              <a href="#">操作一{record.name}</a>
              <span className="ant-divider"></span>
              <a href="#">操作二</a>
              <span className="ant-divider"></span>
              <a href="#" className="ant-dropdown-link">
                更多 <Icon type="down" />
              </a>
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





