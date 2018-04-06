import React, { Component } from 'react';
import logo from './logo.svg';
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


  nameChangeHandler = (event) => {
    this.setState({
      currentName: event.target.value
    });
  }

  groupChangeHandler = (event) => {
    this.setState({
      groupNumber: event.target.value
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
    var finalOutput = [];

    finalOutput.push(
      <ul key="totalOutput">GROUPS
        {this.everyGroup()}
      </ul>
    );

    return finalOutput;
  }

  everyGroup = () => {
    var output = [];
    var index = 0;

    this.state.groupList.forEach(group => {
      output.push(this.singleGroupList(group, index));
      index++;
    });

    console.log(output);

    return output;
  }

  singleGroupList = (groupNames, index) => {
    var liList = [];

    groupNames.forEach(name => {
      liList.push(<li key={name}>{name}</li>)
    });

    return <div><ul key={index}>{liList}</ul><button></button></div>
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Our Shitty Group Splitter</h1>
        </header>

        <div>
          <input type='text' id='name' value={this.state.currentName} onChange={this.nameChangeHandler}/>

          <button id='add' onClick={this.addNameButtonHandler}>Add</button>

          <input type='text' id='group-button' value={this.state.groupNumber} onChange={this.groupChangeHandler}/>

          <button id='group' onClick={this.groupNumberButtonHandler}>Randomize</button>
        </div>

        <div>
          <ul id='nameList'>INPUT LIST
            {this.outputNameList()}
          </ul>
        </div>

        <div>
          {this.outputGroups()}
        </div>

      </div>
    );
  }
}

export default App;
