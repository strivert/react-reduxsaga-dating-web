import React, { Component } from 'react';
import classNames from 'classnames';
import { extractFieldValues } from "../../utils";

class HobbyInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile
    }
    this.finishHobbies = this.finishHobbies.bind(this);
  }

  toggleTag(tag) {
    const selected = this.state.profile.hobbies.values.indexOf(tag);
    let hobbies = this.state.profile.hobbies.values;

    if (selected === -1) {
      hobbies.push(tag);
    } else {
      hobbies.splice(selected, 1);
    }
    this.setState({
      profile: {
        ...this.state.profile,
        hobbies: {
          ...this.state.profile.hobbies,
          values: hobbies
        }
      }
    });
  }

  finishHobbies() {
    const { profile } = this.state;
    if (profile) {
      this.props.goToUpgradeAccount(profile.hobbies.values);
    }
  }

  render() {
    const {
      goPrev,
      goToUpgradeAccount,
    } = this.props;

    const {
      profile,
    } = this.state;

    let hobbies = []
    if (profile && profile.hobbies.values) {
      hobbies = profile.hobbies.values
    }

    return (
      <div className="onboarding onboarding__hobby__interest">
        <h1>Last question!</h1>
        <h1>Pick hobbies/interests below.</h1>
        <div className="box-options">
            {profile && profile.hobbies.available_values &&
              profile.hobbies.available_values.map((tag, index) => {
                let className = classNames("tags", {"selected": hobbies.indexOf(tag.value) > -1});
                return (
                  <span key={index} className={className} onClick={ () => this.toggleTag(tag.value)}>{tag.formatted_value}</span>
                )
              })
            }
        </div>
        <div className="boarding-footer">
          <button className="btn-action" onClick={() => goPrev()}>Back</button>
          <button className="btn-action" onClick={this.finishHobbies}>Finish!</button>
        </div>
      </div>
    );
  }
}

export default HobbyInterest;
