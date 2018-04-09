import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentName: '',
      nameList: [],
      randomizedList: [],
      groupList: [],
      groupNumber: 1
    }
  }


  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  addNameButtonHandler = (event) => {
    var currentList = this.state.nameList;
    currentList.push(this.state.currentName);

    this.setState({
      nameList: currentList,
      currentName: ''
    });
  }


  groupNumberButtonHandler = (event) => {
    this.randomizeNames();
  }


  outputNameList = () => {
    var currentNameList = this.state.nameList;
    var htmlList = [];

    currentNameList.forEach(name => {
      htmlList.push(
        <li key={name}>{name}</li>
      )
    });

    return htmlList;
  }


  randomizeNames = () => {
    var myArray = this.state.nameList;

    var tmp, current, top = myArray.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = myArray[current];
      myArray[current] = myArray[top];
      myArray[top] = tmp;
    }

    var nameList = myArray;
    var groupList = [];
    
    var studentsPerGroup = Math.ceil(nameList.length / this.state.groupNumber);

    for(let i = 0; i < this.state.groupNumber; i++) groupList.push([]);

    for(let j = 0; j <this.state.groupNumber; j++) {
      for(let k = 0; k < studentsPerGroup; k++) {
        if(nameList != null) {
          var nextName = nameList.pop();
          console.log(j, k, nextName);
          groupList[j].push(nextName);
        }
      }
    }

    this.setState({
      groupList: groupList
    });
  }


  outputGroups = () => {
    var groups = [];
    var index = 0;

    this.state.groupList.forEach(group => {
      groups.push(this.singleGroupList(group, index));
      index++;
    });

    return(
      <ul key="totalOutput">GROUPS
        {groups}
      </ul>
    );
  }


  singleGroupList = (groupNames, index) => {
    var liList = [];

    groupNames.forEach(name => {
      liList.push(<li key={name}>{name}</li>)
    });

    return (
      <div>
        <ul key={index}>{liList}</ul>
        <button></button>
      </div>
    );
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Our Shitty Group Splitter</h1>
        </header>

        <div className="input">
          <input type='text' id='name' value={this.state.currentName} name="currentName" onChange={this.changeHandler}/>

          <button id='add' onClick={this.addNameButtonHandler}>Add</button>

          <input type='text' id='group-button' value={this.state.groupNumber} name="groupNumber" onChange={this.changeHandler}/>

          <button id='group' onClick={this.groupNumberButtonHandler}>Randomize</button>
        </div>

        <div className="output">
          <div>
            <ul id='nameList'>INPUT LIST
              {this.outputNameList()}
            </ul>
          </div>

          <div>
            {this.outputGroups()}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
