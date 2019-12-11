// Import React
import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './services/Firebase';
import Div100vh from 'react-div-100vh'

import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import AppList from './components/AppList/AppList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null,
      gamesResults: [],
      games: [],
      lootBoxTiers: { 
        1: {
          name: 'None',
          description: "gameplay isn't progressed by chance (no slot machines, you progress with your own choices)"
        },
        2: {
          name: 'Cosmetic',
          description: 'contains no items that impact gameplay (e.g. weapon skins, emotes, emblems)'
        },
        3: {
          name: 'Inoffensive',
          description: 'contains items important to the game but can be earned reasonably'
        },
        4: {
          name: 'Annoying/\nGrindy',
          description: 'contains items important to the game and take too long to earn in order to encourage the player engaging in microtransactions'
        },
        5: {
          name: 'Unfair',
          description: 'Gameplay progression happens through random chance events (loot boxes, slot machines, etc) and users who pay have an unfair advantage in order to encourage you to engage in microtransactions'
          // description: 'contains weapons/items/consumables important to the game and take too long to earn in order to encourage the player to engage in microtransactions'
        }
      },
      lootBoxTier: 5,
      adTiers: {
        1: {
          name: 'None',
          description: 'No ads at all'
        },
        2: {
          name: 'Optional',
          description: 'an option to watch an ad to gain an item'
        },
        3: {
          name: 'Skippable',
          description: 'ads that you can skip up to a Max of 5 seconds in, any more and its classed as obsessive'
        },
        4: {
          name: 'Obtrusive/ infrequent',
          description: "ads take up part of the screen during gameplay or ads appear only every few levels, they aren't every time you level up or die"
        },
        5: {
          name: 'Obsessive',
          description: 'ads after every level even if they are partially skippable'
        }
      },
      adTier: 5,
      timerTiers: {
        1: {
          name: 'None',
          description: 'No forcing the player to wait or pay to bypass'
        },
        2: {
          name: 'Upgrades',
          description: 'requires you to wait or speed up an upgrade by paying a cost with a rare resource that the user usually has to pay for'
        },
        3: {
          name: 'Energy',
          description: 'requires you to some of your limited supply of "energy" to play'
        },
      },
      timerTier: 3,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
    } else {
      this.setState({ user: null });
    }

    const appsRef = firebase
      .database()
      .ref('0/games/');
      // I need to give each game a property with its combined tiers value joined like a string to make a sortable index
      // appsRef.orderByChild('tierIndex').equalTo('4_4_3').limitToFirst(50).once('value', snapshot => {
      appsRef.limitToFirst(50).once('value', snapshot => {
        console.log(snapshot);
      // appsRef.orderByChild('reviews/0/lootBoxTier').endAt(3).limitToFirst(50).once('value', snapshot => {
        let apps = snapshot.val();
        
        this.setState({
          gamesResults: apps,
          games: apps
        });
      });

    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate('/home');
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login');
      });
  };

  handleSlide = (e, tier) => {
    this.setState({
      [tier]: e,
      // lastTouched: tier,
      // descriptionClasses: 'slider-description ' + borderDirection
    });
  }

  render() {
    return (
      <Div100vh className="vh100">
        {/* <Navigation
          user={this.state.user}
          logOutUser={this.logOutUser}
        /> */}
        {/* {this.state.user && (
          <Welcome
          userName={this.state.displayName}
          logOutUser={this.logOutUser}
          />
        )} */}

        <Router className="vh100">
          <Home
            path="/"
            user={this.state.user}
            lootBoxTier={this.state.lootBoxTier}
            lootBoxTiers={this.state.lootBoxTiers}
            adTier={this.state.adTier}
            adTiers={this.state.adTiers}
            timerTier={this.state.timerTier}
            timerTiers={this.state.timerTiers}
            handleSlide={this.handleSlide}
          />
          <AppList
            path="/results"
            gamesResults={this.state.gamesResults}
            addMeeting={this.addMeeting}
            userID={this.state.userID}
            lootBoxTier={this.state.lootBoxTier}
            lootBoxTiers={this.state.lootBoxTiers}
            adTier={this.state.adTier}
            adTiers={this.state.adTiers}
            timerTier={this.state.timerTier}
            timerTiers={this.state.timerTiers}
          />
        </Router>
      </Div100vh>
    );
  }
}

export default App;
