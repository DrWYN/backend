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
                <div onClick={this.testClick.bind(this)}>{this.props.text || 'home'}</div>
            </div>
        );
    }
}

function mapStateToProps(state){
    let {text} = state.test;
    return {
        text: text
    }
}

export default connect(mapStateToProps)(Home);





