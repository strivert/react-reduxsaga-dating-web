import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import SelectBox from '../../../../components/SelectBox';
import FormErrors from '../../../../components/FormErrors';

const StepFormGenerator = ({onChange, value, nextStep, prevStep, onSubmit, errors, personality_test, step, scaleOptions}) => {

  const renderFields = () => {
    return personality_test && personality_test.questions.map((item, key) => (
      <div key={key}>
        <label>{item.question}</label>
        <SelectBox
          choices={scaleOptions}
          value={value[item.id]}
          onChange={(val) => onChange({target: {name: `${item.id}`, value: val && val && val && val.value }})}
        />
      </div>
    ))
  }

  return (
    <section>
      <h4>{personality_test.name}: {personality_test.title}</h4>
      <p>{personality_test.description}</p>
      {errors && <FormErrors formErrors={errors} />}
      <h4>Complete: {Math.round((step - 1) / 7 * 100)}% </h4>
      <Line percent={(step - 1) / 7 * 100} strokeWidth="3" strokeColor="#2B7DB6" />
      <div className="settings__fields">
        {renderFields()}
      </div>
      {errors && <p className="has-error">Please, answer all questions before proceeding to the next step</p>}
      <div className="action__buttons">
        {prevStep? <button className="prev" onClick={prevStep}><i className="fa ti-control-backward"></i> Prev Step</button>: null}
        {nextStep? <button className="next" onClick={nextStep}>Next Step  <i className="fa ti-control-forward"></i></button>: null}
        {onSubmit? <button className="next" onClick={onSubmit}>Submit Results <i className="fa fa-paper-plane"></i></button>: null}
      </div>
    </section>
    )
  }

StepFormGenerator.propTypes = {
  onChange: PropTypes.func.isRequired, 
  value: PropTypes.object.isRequired, 
  nextStep: PropTypes.func, 
  prevStep: PropTypes.func, 
  onSubmit: PropTypes.func, 
  errors: PropTypes.object, 
  personality_test: PropTypes.object.isRequired, 
  step: PropTypes.number.isRequired, 
  scaleOptions: PropTypes.array.isRequired
}

export default StepFormGenerator;