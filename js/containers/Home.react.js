import React, {Component} from 'react';

import { connect } from 'react-redux';
import bindActions from '../actions/bind';


class Home extends Component{
    constructor(props){
        super(props);
    }
    testClick(){
        // bindActions.testAction('aaaa');
        bindActions.apiAction();
    }

    render(){
        return (
            <div>
                <div onClick={this.testClick.bind(this)}>Home</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        test: state.test
    }
}

export default connect(mapStateToProps)(Home);





