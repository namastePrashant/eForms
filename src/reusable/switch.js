import React, { useState, useEffect } from 'react';

const Switch = (props) => {
  const { value, itemId, handleSwitchValueChange, additionalId, groupIndex } = props;
  const [switchValue, setSwitchValue] = useState(value);


  let boolVal;
  if (value === 'pass') {
    boolVal = true
  } else if (value === 'fail') {
    boolVal = false
  } else {
    boolVal = value
  }

  useEffect(() => {
    setSwitchValue(value ?? 'n/a');
  }, [value])

  const handleSwitchChange = (value) => {
    let val = value !== -1 ?
      value ? 'pass' : 'fail'
      : 'n/a';
    setSwitchValue(val);
    handleSwitchValueChange(val);
  }


  return (
    <div className="tw-toggle">
      <p className={`status-label ${switchValue === 'n/a' ? 'applicable' : switchValue}`}>{switchValue}</p>
      <div className={`switch-wrapper ${props?.showError ? 'border-red' : ''}`}>
        <input checked={switchValue === 'fail' ? true : false} type="radio" value={false} name={`toggle-${itemId}${additionalId ?? ''}${groupIndex ?? ''}`} onClick={() => handleSwitchChange(false)} />
        <label className="toggle toggle-no"><i className="fa fa-times"></i></label>
        <input checked={(switchValue === 'n/a' || switchValue === undefined) ? true : false} type="radio" value={-1} name={`toggle-${itemId}${additionalId ?? ''}${groupIndex ?? ''}`} onClick={() => handleSwitchChange(-1)} className="unselected" />
        <label className="toggle toggle-neutral"><i className="fa fa-minus"></i></label>
        <input checked={switchValue === 'pass' ? true : false} type="radio" value={true} name={`toggle-${itemId}${additionalId ?? ''}${groupIndex ?? ''}`} onClick={() => handleSwitchChange(true)} />
        <label className="toggle toggle-yes"><i className="fa fa-check"></i></label>
        <span></span>
      </div>
    </div>

  )
}

export default React.memo(Switch);