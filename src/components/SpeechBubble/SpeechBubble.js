import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import { Link } from '@reach/router';
import Slider, { Range } from 'rc-slider';
import Div100vh from 'react-div-100vh'


import './speech-bubble.css';


class SpeechBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSpeech: "Hey looks like you are new here. Do you want me to teach you how to find free mobile games that aren't ruined by overly aggressive money making tactics?",
      speechState: '1',
      speech: {
        '1': {
          cat: "Hey looks like you are new here. Do you want me to teach you how to find free mobile games that aren't ruined by overly aggressive money making tactics?",
          options: {
            'a': "Sure why not.",
            'b': "No thanks I'm here for something else.",
            // 'c': "No thanks I know what I'm doing. <strong>Quit chat</strong>"
          },
        '2a': {
          cat: `Free mobile games have 3 main methods of monetization. This web 
                app gives you an interface to set your tolerance to how aggresive 
                those stratergies are and then find games that don't exceed it.
                These strategies are known as lootboxes, ADs and timers`,
          options: {
            'a': "Tell me more about lootboxes",
            'a': "Tell me more about ADs",
            'a': "Tell me more about Timers",
            'a': "Tell me more about lootboxes",
          }
        }
        }
      }
    };


    this.speechNext = this.speechNext.bind(this);
    this.renderSpeechOptions = this.renderSpeechOptions.bind(this);


  }

  componentDidMount() {
    this.renderSpeechOptions('1');
  }

  speechNext(newSpeechState) {
    this.setState({
      speechState: newSpeechState 
    });
    // this.renderSpeechOptions(newSpeechState)
  }
  
  renderSpeechOptions(newSpeechState) {
    var renderedOptions = '';

    var options = this.state.speech[newSpeechState].options;
    console.log(options);
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const option = options[key];
        renderedOptions = renderedOptions + `<button className="speech-option">${option}</button>`;
      }
    }

    this.setState({
      options: renderedOptions   
    });
  }


  render() {

    return (
        <div className="speech-bubble-up">
          <Router className="">
          {/* <Dialog
            path="/"
            user={this.state.user}
            lootBoxTier={this.state.lootBoxTier}
            lootBoxTiers={this.state.lootBoxTiers}
            adTier={this.state.adTier}
            adTiers={this.state.adTiers}
            timerTier={this.state.timerTier}
            timerTiers={this.state.timerTiers}
            handleSlide={this.handleSlide}
          /> */}
          </Router>
          {/* <p>{(this.state.speech[this.state.speechState].cat)}</p>
          <div className="speech-bubble-up-ds-arrow"></div>
          <SpeechOptions></SpeechOptions> */}
        </div>
        );
  }
}

export default SpeechBubble;
