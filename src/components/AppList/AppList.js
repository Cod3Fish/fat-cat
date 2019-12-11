import React, { Component } from 'react';
import { FaGooglePlay } from 'react-icons/fa';
import obsessiveAdsIcon from '../../images/obsessive-ads.png';
import obtrusiveAdsIcon from '../../images/obtrusive-or-infrequent-ads.png';
import skippableAdsIcon from '../../images/skippable-ads.png';
import optionalAdsIcon from '../../images/optional-ads.png';

class AppList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: '' });
  }

  render() {
    const props = this.props;
    
    
    const { gamesResults } = this.props;
    console.log(gamesResults);
    
    const filtered = gamesResults.filter((game) => {
      console.log(props.lootBoxTier);
      console.log(props.lootBoxTiers);
      console.log(props.adTier);
      console.log(props.adTiers);
      console.log(props.timerTier);
      console.log(props.timerTiers);
      if (game.adTier <= props.adTier) {
        if (game.lootBoxTier <= props.lootBoxTier) {
          if (game.timerTier <= props.timerTier) {
            return true;
          }
        }
      }
      return false;
    });

    const calculateScore = (item) => {
      return item.adTier;
    }
    
    console.log(filtered);

    // return '';
    const appList = filtered.map(item => {
      // console.log(item.id);
      return (
        <div className="list-item-container d-flex" key={item.id}>
          <div className="list-item">
            <div className="item-title-container">
              <div className="app-icon">
                <img src={item.icon}/>
              </div>
              <div className="item-name text-left align-self-start">
                {item.name}
              </div>
            </div>
            <div className="icon-tier-container">
              <div className="icon-tier">
                {/* <img src={obsessiveAdsIcon}/> */}
                <h4>{item.lootBoxTier}</h4>
              </div>
              <div className="icon-tier">
                {/* <img src={optionalAdsIcon}/> */}
                <h4>{item.adTier}</h4>
              </div>
              <div className="icon-tier">
                {/* <img src={skippableAdsIcon}/> */}
                <h4>{item.timerTier}</h4>
              </div>
            </div>
            <div>
                <h4>{calculateScore(item)}</h4>
            </div>
            <div
              className="btn-group align-self-end playstore-btn"
              role="group"
              aria-label="Meeting Options"
            >
              <a
                className="btn btn-sm btn-outline-light"
                title="View in Google playstore"
                href={item.url}
                target="_BLANK"
              >
                <FaGooglePlay />
              </a>

            </div>
          </div>          
        </div>
      );
    });
    return appList;
  }
}

export default AppList;
