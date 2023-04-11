import React, { useState } from 'react'
import './Container.css'
import Case from './Case';

class Container extends React.Component{
  constructor(props){
    super(props);
  }
  
  handleClickOneCase(ID){
    this.props.onClickOne(ID)
  }

  render(){
    return <div className="container">{
        this.props.setCases.map((oneCase,index)=> <Case 
            onClick={this.handleClickOneCase.bind(this)}
            caseObj={oneCase}
            niveau={this.props.niveau}
            key={index}
        ></Case> )
    }</div>
  }
}

export default Container;
