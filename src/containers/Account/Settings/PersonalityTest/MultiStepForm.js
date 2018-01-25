import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import StepFormGenerator from './StepFormGenerator';
import { fields, personalQuestions,  partnerQuestions} from './utils';

class MultiStepForm extends Component {
  state = {
    personality_test: fields,
    step: 1,
    errors: null
  }

  handleOnChange = ({target: {name, value}}) => {
    this.setState({personality_test: {...this.state.personality_test, [name]: value}});
  }

  nextStep = () => {
    const {personalityTestQuestions} = this.props;
    const {step} = this.state;
    if(this.isValid(personalityTestQuestions[step - 1].questions)) return;
    
    this.setState((prevState) => ({
      step: prevState.step + 1,
      errors: null
    }));
  }

  prevStep = () => {
    this.setState((prevState) => ({
      step: prevState.step - 1,
      errors: null
    }));
  }

  isValid (questions){
    const errors = {};
    questions.map((value) => {
       if(!this.state.personality_test[value.id]){
          errors[value.id] = value.question;
       }
       return errors;
    });

    if(!isEmpty(errors)) {
      this.setState({errors})
      return true;
    }
    return false;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {personalityTestQuestions} = this.props;
    const {step} = this.state;
    if(this.isValid(personalityTestQuestions[step - 1].questions)) return;
    this.props.submitPersonalityTestRequest({personality_test: this.state.personality_test});
  }

  renderSteps() {
    const { step, personality_test, errors }= this.state;
    const { personalityTestQuestions } = this.props;

	if (!personalityTestQuestions) {
      return null;
    }

    switch(step) {
      case 1:
        return <StepFormGenerator                 
                  personality_test={personalityTestQuestions[step-1]}
                  value={personality_test}
                  scaleOptions={personalQuestions}
                  onChange={this.handleOnChange} 
                  nextStep={this.nextStep}
                  errors={errors}
                  step={step}
                />
      case 2:
        return <StepFormGenerator                 
                  personality_test={personalityTestQuestions[step-1]}
                  value={personality_test}
                  scaleOptions={personalQuestions}                  
                  onChange={this.handleOnChange}
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  errors={errors}
                  step={step}                  
                />
      case 3:
        return <StepFormGenerator
                  personality_test={personalityTestQuestions[step-1]}
                  value={personality_test}
                  scaleOptions={personalQuestions}                  
                  onChange={this.handleOnChange}
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  errors={errors}
                  step={step}                  
                />
      case 4:
        return <StepFormGenerator                  
                  personality_test={personalityTestQuestions[step-1]}
                  value={personality_test}
                  scaleOptions={partnerQuestions}                  
                  onChange={this.handleOnChange}
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  errors={errors}
                  step={step}                  
                />
      case 5:
        return <StepFormGenerator                  
                  personality_test={personalityTestQuestions[step-1]}
                  value={personality_test}
                  scaleOptions={partnerQuestions}                  
                  onChange={this.handleOnChange}
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  errors={errors}
                  step={step}                  
                />
      case 6:
        return <StepFormGenerator                 
                  personality_test={personalityTestQuestions[step-1]}
                  value={personality_test}
                  scaleOptions={partnerQuestions}                  
                  onChange={this.handleOnChange}
                  nextStep={this.nextStep}
                  prevStep={this.prevStep}
                  errors={errors}
                  step={step}                  
                />
      case 7:
        return <StepFormGenerator
                  personality_test={personalityTestQuestions[step-1]}
                  value={personality_test}
                  scaleOptions={partnerQuestions}                  
                  onChange={this.handleOnChange}
                  prevStep={this.prevStep}
                  errors={errors}
                  step={step}                  
                  onSubmit={this.handleSubmit}
                />

        default: 
          return
    }
  }

  render() {
    return(
      <div>
        {this.renderSteps()}
      </div>
    )
  }
}

MultiStepForm.propTypes = {
  submitPersonalityTestRequest: PropTypes.func.isRequired,
  personalityTestQuestions: PropTypes.array,
}

export default MultiStepForm;