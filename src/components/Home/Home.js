import React, { Component } from 'react';
import { Link } from '@reach/router';
import Slider, { Range } from 'rc-slider';
import Div100vh from 'react-div-100vh'

import './slider.css';

import fatCat1 from '../../images/fat-cat-1.png';
import SpeechBubble from '../SpeechBubble/SpeechBubble.js';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTouched: 'lootBoxTier',
      descriptionClasses: 'slider-description radius-right',
      activeSpeech: "Hey looks like you are new here. Do you want me to teach you how to find free mobile games that aren't ruined by overly aggressive money making tactics?"
    };
    this.handleSlide = this.handleSlide.bind(this);
    this.speechNext = this.speechNext.bind(this);

  }

  handleSlide(e, tier) {
    
    console.log(e);
    let borderDirection = 'radius-right';
    if(tier === 'adTier') {
      borderDirection = 'radius-right radius-left';
    } else if(tier === 'timerTier') {
      borderDirection = 'radius-left';
    }
    this.props.handleSlide(e, tier);
    this.setState({
      [tier]: e,
      lastTouched: tier,
      descriptionClasses: 'slider-description ' + borderDirection
    });

  }

  speechNext() {
    this.setState({
      activeSpeech: "s"
    });
  }

  render() {
    const { user } = this.props;
    var intViewportHeight = window.innerHeight;
    console.log(intViewportHeight/4);
    const wrapperStyle = {
      height: (intViewportHeight/5) - 20,
      width: 30,
      marginTop: 10,
      marginLeft: 40,
      marginRight: 30,
      marginBottom: 30,
    };

    document.ontouchmove = (e) => {
      e.preventDefault();
    }

    return (
      <Div100vh className="app-container">
        <nav className="grid-nav">
          <Link to="/" className="nav-brand">
            Fat-cat.io
          </Link>
        </nav>

        <div className="cat-container">
            <img className="fat-cat" src={fatCat1} />
        </div>
        {/* <SpeechBubble></SpeechBubble> */}

        {/* <div className="shadow"></div> */}

        <div className="bg-row bg-left"></div>
        <div className="bg-row bg-middle"></div>
        <div className="bg-row bg-right"></div>

        <div className="attribute-name-row loot-boxes-column">
          <div className="slider-name">Loot Boxes</div>
        </div>

        <div className="attribute-value-row loot-boxes-column">
          <div className={
            (this.state.lastTouched === 'lootBoxTier' 
            ? 'slider-value slider-value-active'
            : 'slider-value')
          }>
            {(
              this.props.lootBoxTiers[this.props.lootBoxTier].name === 'Game Breaking'
              ? (<span>Game <br></br>Breaking</span>)
              : this.props.lootBoxTiers[this.props.lootBoxTier].name
            )}
            {/* {this.state.lootBoxTiers[this.state.lootBoxTier].name} */}
          </div>
        </div>

        <div className="attribute-name-row ads-column">
          <div className="slider-name">ADs</div>
        </div>

        <div className="attribute-value-row ads-column">
          <div className={
            (this.state.lastTouched === 'adTier' 
            ? 'slider-value slider-value-active'
            : 'slider-value')
          }>
            {this.props.adTiers[this.props.adTier].name}
          </div>
        </div>

        <div className="attribute-name-row timers-column">
          <div className="slider-name">Timers</div>
        </div>
        <div className="attribute-value-row timers-column">
          <div className={
            (this.state.lastTouched === 'timerTier' 
            ? 'slider-value slider-value-active'
            : 'slider-value')
          }>
            {this.props.timerTiers[this.props.timerTier].name}
          </div>
        </div>

        <div className="tier-description-container">
          <div className={this.state.descriptionClasses}>
            {this.props[this.state.lastTouched + 's'][this.props[this.state.lastTouched]].description}
          </div>
        </div>
      
        <div className="slider-row loot-boxes-slider">
          <Slider 
            min={1}
            max={5}
            defaultValue={this.props.lootBoxTier}
            marks={{ 1: 'None', 2: 'Cosmetic', 3: 'Inoffensive', 4: 'Annoying/Grindy', 5: 'Game Breaking' }}
            step={null}
            vertical={true}
            onChange={(e) => this.handleSlide(e, 'lootBoxTier')}
            onBeforeChange={(e) => this.handleSlide(e, 'lootBoxTier')}
          />
        </div>

        <div className="slider-row ads-slider">                
          <Slider 
            min={1}
            max={5}
            defaultValue={this.props.adTier}
            marks={{ 1: 'None', 2: 'Optional', 3: 'Skippable', 4: 'Obtrusive or infrequent', 5: 'Obsessive' }}
            step={null}
            vertical={true}
            onChange={(e) => this.handleSlide(e, 'adTier')}
            onBeforeChange={(e) => this.handleSlide(e, 'adTier')}
          />
        </div>

        <div className="slider-row timers-slider">
          <Slider 
            min={1}
            max={3}
            defaultValue={this.props.timerTier}
            marks={{ 1: 'None', 2: 'Upgrades', 3: 'Energy' }}
            step={null}
            vertical={true}
            onChange={(e) => this.handleSlide(e, 'timerTier')}
            onBeforeChange={(e) => this.handleSlide(e, 'timerTier')}
          />
        </div>

        <div className="grid-search-button">
          <div className="search-button">
            <Link to="/results">
              Find games
            </Link>
          </div>
        </div>

      </Div100vh>        
    );
  }
}

export default Home;
