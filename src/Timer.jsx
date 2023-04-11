import React from "react";

class Timer extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let sec=0;
        let ms=0;
        return<>
            <h3 className="lab_timer">Time:
                <span className="val_sec">{this.props.value}</span> s
            </h3>
        </>
    }
}

export default Timer;