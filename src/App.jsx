import React, { useState } from 'react'
import './App.css'
import Container from './Container';
import Score from './Score';
import Timer from './Timer'
import Controls from './Controls';

function randIntToTab(size,c=2) {
  let tab_to_push=[];
  let final_tab=[];
  for (let i = 1; i <= size; i++) {
    let p;
    if (i<=(size/c)) p=i
    else {
      let m=1;
      for (let j = 1; j <= c; j++) {
        if (i>=(size/c)*(j-1) && i<=(size/c)*(j)) {
          m=j;
          break;
        }
      }
      p=i-((size/c)*(m-1))
    }
    tab_to_push.push(p)
  }

  for (let i = 0; i < size; i++) {
    const index=Math.floor(Math.random()*(tab_to_push.length));
    final_tab.push(tab_to_push[index]);
    tab_to_push.splice(index,1);
  }
  return final_tab;
}

function randElementFromTab(tab) {
  var el=tab[Math.floor(Math.random()*tab.length)];
  return el;
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.niv=2;
    let tab=this.setNiveauForRandIntToTab(this.niv)
    let tmp=[];
    let backIndex=randElementFromTab([1,2,3,4]);
    tab.forEach((element,index) => {
      tmp.push({
        ID:index,
        back:'src/assets/back/back-'+backIndex+'.png',
        front:'src/assets/img/img-'+tab[index]+'.png',
        show:false
      })
    });
    this.firstClicked=-1;
    this.secundClicked=-2;
    this.initialState={
      cases:tmp,
      firstClick:false,
      secundClick:false,
      canClick:true,
      visibilityTime:1500,
      score:0,
      time:0,
      gagne:false,
      niveau:this.niv
    };
    this.state=this.initialState;
}

setNiveauForRandIntToTab(n){
  let tab=[];
  if (n==1) {
    tab=randIntToTab(16);
  }else if (n==2) {
    tab=randIntToTab(64,8);
  }else if (n==3) {
    tab=randIntToTab(64,2);
  }
  return tab;
}

reinitialize(niveau=1){
  let tab=this.setNiveauForRandIntToTab(niveau);
    let tmp=[];
    let backIndex=randElementFromTab([1,2,3,4]);
    tab.forEach((element,index) => {
      tmp.push({
        ID:index,
        back:'src/assets/back/back-'+backIndex+'.png',
        front:'src/assets/img/img-'+tab[index]+'.png',
        show:true
      })
    });
    this.firstClicked=-1;
    this.secundClicked=-2;
    let tmpState={
      cases:tmp,
      firstClick:false,
      secundClick:false,
      canClick:true,
      visibilityTime:1500,
      score:0,
      time:0,
      gagne:false,
      niveau:this.niv
    };
    this.setState((()=>tmpState)())
    //tout fermer
    setTimeout(() => {
      this.allVisible(false)
    }, this.state.visibilityTime);
}

  allVisible(visible){
    if (visible) {
      let tmp=this.state.cases;
      tmp.forEach(element => {
        element.show=true;
      });
      this.setState({cases:tmp});
    }else{
      let tmp=this.state.cases;
      tmp.forEach(element => {
        element.show=false;
      });
      this.setState({cases:tmp});
    }
  }

  visibleAfter(ID,visible=true,time=1000){
    setTimeout(() => {
      let tmp=this.state.cases;
      tmp[ID].show=visible;
      console.log('closed');
      this.setState({
        cases:tmp
      });
    }, time);
  }

  componentDidMount(){
    this.allVisible(true);
    setTimeout(() => {
      this.allVisible(false);
    }, this.state.visibilityTime);
    //Timer
    setInterval(() => {
      if(!this.state.gagne)this.setState({time:(()=>this.state.time+1)()})
    }, 1000);
  }

  verifierSiGagne(){
    let tmp=this.state.cases;
    let gagner=true;
    tmp.forEach(element => {
      if (!element.show) {
        gagner=false;
      }
    });
    this.setState({gagne:gagner});
    return gagner;
  }

  handleClickOneCase(ID){
    if(this.state.canClick){
    if (this.state.firstClick && (ID==this.firstClicked)) {
        //fermer
        let tmp=this.state.cases;
        tmp[ID].show=false;
        this.setState({
          cases:tmp,
          firstClick:false
        });
      }
      else if (!this.state.firstClick) {
        if(!this.state.cases[ID].show){
          //premier click
          let tmp=this.state.cases;
          tmp[ID].show=true;
          this.setState({
            cases:tmp,
            firstClick:true
          });
          this.firstClicked=ID
        }
      }else if (this.state.firstClick && (!this.state.secundClick)) {
        if(!this.state.cases[ID].show){
          //second click
          let tmp=this.state.cases;
          tmp[ID].show=true;
          this.setState({
            cases:tmp,
            secundClick:true
          });
          this.secundClicked=ID;
          let equal=(this.state.cases[this.firstClicked].front == this.state.cases[ID].front);
          console.log(equal);
          if (!equal) {
            this.visibleAfter(this.firstClicked,false);
            this.visibleAfter(this.secundClicked,false);
          }else{
            //score ++
            this.setState({score:(()=>this.state.score+1)()})
            //verifierSiGagne
            if(this.verifierSiGagne()) {
              setTimeout(() => {
                alert('GAGNE\nScore:'+this.state.score+'\nTemps ecoulées:'+this.state.time)
                this.handleReboot()
              }, 500)
            }
          }
          this.setState({
            firstClick:false,
            secundClick:false
          })
        }
      }
    }else{
      //can't click
    }
  }

  handleChangeNiveau(n){
    this.reinitialize(n);
    this.setState({niveau:n});
  }

  handleReboot(){
    let niv=this.state.niveau;
    this.reinitialize(niv);
    this.setState({niveau:niv});
  }

  render(){
    return<>
      <div className="etats">
        <Score value={this.state.score}></Score>
        <Timer value={this.state.time}></Timer>
      </div>
      <Container niveau={this.state.niveau} onClickOne={this.handleClickOneCase.bind(this)} setCases={this.state.cases}></Container>
      <Controls onReboot={this.handleReboot.bind(this)} onChangeNiv={this.handleChangeNiveau.bind(this)}></Controls>      
    </>
  }
}

export default App
