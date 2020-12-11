import logo from './logo.svg';
import './App.css';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', count:0, show:true, flipcount:0};

  }

  handleChange(event) {
    var i;
    var count = 0;
    for(i=0; i<event.target.value.length;i++){
      if(event.target.value[i] === 'a'){count++;}
    }
    this.setState({value: event.target.value, count:count, flipcount:count});
  }
  handleflip() {
    if(!this.state.show === false){
        this.setState({count:"", show:!this.state.show});
    }
    else{
        this.setState({count:this.state.flipcount, show:!this.state.show});
    }
  }


  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)} />
        <p>{this.state.count}</p>
        <input type="checkbox" onChange={this.handleflip.bind(this)} />
      </div>
    );
  }
}
export default App;
