// menu 菜单管理
import React, {Component} from 'react';
import { Table } from 'antd';
import Util from '../../utils/Util'

import {Link} from 'react-router';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  sorter: true,
  render: name => `${name.first} ${name.last}`,
  width: '20%',
}, {
  title: '性别',
  dataIndex: 'gender',
  filters: [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ],
  width: '20%',
}, {
  title: '邮箱',
  dataIndex: 'email',
}];


export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
          data: [],
          pagination: {},
          loading: false,
        }
    }

    componentDidMount(){
        this.fetch();
    }

    handleTableChange(pagination, filters, sorter) {
        const pager = this.state.pagination;
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetch(Object.assign({}, filters, {
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
        }));
    }
    fetch(params = {}) {
        console.log('请求参数：', params);
        this.setState({ loading: true });
        Util.fetchGet('http://api.randomuser.me', Object.assign({}, params, {results: 10})).then(data => {
          const pagination = this.state.pagination;
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.setState({
            loading: false,
            data: data.results,
            pagination,
          });
        });
    }

    render(){
        return (
            <div>
                <div>Menu</div>
                <Table columns={columns}
                    rowKey={record => record.registered}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={(pagination, filters, sorter)=>this.handleTableChange(pagination, filters, sorter)}
                  />
            </div>
        );
    }
}





