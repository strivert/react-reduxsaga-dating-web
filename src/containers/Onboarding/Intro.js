
import React, { Component } from 'react';
import SelectBox from "../../components/SelectBox";

const ages = [...Array(80)].map((v,i) => i + 18)
class Intro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      age_interested_low:  18,
      age_interested_high: 80,
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.profile) {
    //   this.setState({
    //     age_interested_low: parseInt(nextProps.profile['age_interested_low'].value),
    //     age_interested_high: parseInt(nextProps.profile['age_interested_high'].value)
    //   });
    // }
  }

  handleChangeAge(fieldName, val) {
    const { handleOnChange } = this.props;
    this.setState({
      [fieldName]: val && val && val.value
    });

    handleOnChange({target: { name: fieldName, value: val && val && val.value}})
  }

  render() {
    const {  goNext, currentPath } = this.props;
    const { age_interested_high, age_interested_low } = this.state;
    return (
      <div className="onboarding onboarding__intro">
        <h1>Welcome! Let's Get You Set Up.</h1>
        <p>We need to set up your account, but don't worry, it's very easy and can take less than 90 seconds for most people.</p>
        <h2>Let's Start with an Easy Question:<br/>
        What ages are you interested in?</h2>
        <div className="box-options center">
          <div className="age">
            <SelectBox
              name="age_interested_low"
              className="birthday__field"
              value={age_interested_low}
              choices={ages}
              onChange={(val) => this.handleChangeAge('age_interested_low', val)}
            />
          </div>
          <p>and</p>
          <div className="age">
            <SelectBox
              name="age_interested_high"
              className="birthday__field"
              value={age_interested_high}
              choices={ages}
              onChange={(val) => this.handleChangeAge('age_interested_high', val)}
            />
          </div>
        </div>
        <button className="btn-action" onClick={()=> goNext(null, null, currentPath)}>Next</button>
      </div>
    );
  }
}

export default Intro;
