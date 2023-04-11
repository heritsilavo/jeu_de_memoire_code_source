import React, { useState } from 'react'

class Case extends React.Component{
  constructor(props){
    super(props);
  }
  
  handleClick(){
    this.props.onClick(this.props.caseObj.ID)
  }

  setStyle(n){
    if (n==1) {
      return{
        width:"calc((100%/8.6)*2)",
        height:"calc((100%/8.6)*2)",
        borderRadius:"10px",
        border: '1px solid',
        borderRadius: "10px",
        cursor:" pointer",
        backgroundColor: "#e5ffac",
        userSelect:" none",
        '-webkit-user-drag': "none",
      }
    }else if (n==2 || n==3) {
      return{
        width:"calc((100%/8.6))",
        height:"calc((100%/8.6))",
        borderRadius:"10px",
        border: '1px solid',
        borderRadius: "10px",
        cursor:" pointer",
        backgroundColor: "#e5ffac",
        userSelect:" none",
        '-webkit-user-drag': "none",
      }
    }
  }

  render(){
    let src=(this.props.caseObj.show)?this.props.caseObj.front:this.props.caseObj.back;
    return <img
        style={this.setStyle(this.props.niveau)}
        onClick={this.handleClick.bind(this)}
        src={src}
        alt={this.props.caseObj.ID} 
        className="case"></img>
  }
}

export default Case
