import React, { Component } from "react";
import PinInput from "react-pin-input";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import correct from "./correct"
import "./App.css";

class App extends Component {

  //Constructors
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      locked: true,
      password: Object.values(correct)[0]
    };
  }
  
  componentDidMount() {
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChange(value) {
    this.setState({ value: value });
  }

  onKeyPress(button) {
      if (this.pin.elements[2].state.value) {
        this.pin.elements[3].state.value = button;
        setTimeout(this.onSubmitHandler, 1000);
        return;
      }
      if (this.pin.elements[1].state.value) {
        this.pin.elements[2].state.value = button;
        return;
      }
      if (this.pin.elements[0].state.value) {
        this.pin.elements[1].state.value = button;
        return;
      }
      this.pin.elements[0].state.value = button;
  }

  onChangeInput = (event) => {
    let value = event.target.value;
    this.setState(
      {
        value: value
      },
      () => {
        this.keyboard.setInput(value);
      }
    );
  };

  onClear = () => {
    this.setState({
      value: null
    });
  };

  onSubmitHandler(e) {
    this.pin.value = this.state.value;
    if (this.state.value == this.state.password) {
      this.setState({
        locked: false,
      })
      setTimeout(function(){
        window.location.reload();
     }, 5000); 

    } else {
      window.location.reload();
    }
  }

  render() {
    let imageURL = "";
    const locked = this.state.locked;
   
    if (locked)
           imageURL = "padlock.png";
    else
           imageURL = "unlock.png";
    
    return (
      <div className="body">
        <div className="top">
          <h1>Number lock</h1>
        </div>

        <div className="bottom">
        <div>
            <img src={imageURL} alt="Lock" width="64"/>
        </div>

        <div>
           {locked}
        </div>
       
        <PinInput
          length={4}
          ref={(p) => (this.pin = p)}
          inputMode="number"
          onChange={this.onChange}
          onComplete={this.onSubmitHandler}
          type={!this.state.hidden ?  'hidden' : 'checkbox'} 
        />

        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", " 0 "]
          }}
          maxLength={4}
          onChange={(input) => this.onChange(input)}
          onKeyPress={(button) => this.onKeyPress(button)}
          onComplete={this.onSubmitHandler}
        />
      </div>
      </div>
    );
  }
}

export default App;

