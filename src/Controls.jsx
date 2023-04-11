import React from "react";
import './Controls.css'

class Controls extends React.Component{
    constructor(props){
        super(props)
    }

    handleChangeNiveau(){
        this.props.onChangeNiv(document.getElementById('niveau').value)
    }

    render(){
        return <div className="controls">
            <div>
                <label htmlFor="niveau">Niveau:</label>
                <select onChange={this.handleChangeNiveau.bind(this)} name="niveau" defaultValue="2" id="niveau" className="niveau">
                    <option value="1">Facile</option>
                    <option value="2">Moyen</option>
                    <option value="3">Difficile</option>
                </select>
            </div>
            <button onClick={this.props.onReboot} id="reboot">Reinitialiser</button>
        </div>
    }
}
export default Controls;