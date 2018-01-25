import React from 'react'

const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    <p>Please answer the following questions before proceeding to the next step:</p>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName.replace('_', ' ')}: {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
</div>

export default FormErrors;