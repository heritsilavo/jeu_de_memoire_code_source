import React from "react";

class Score extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return<>
            <h3 className="lab_score">Score=
                <span className="val_score">{this.props.value}</span>
            </h3>
        </>
    }
}
export default Score;