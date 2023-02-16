import React, { useState, useEffect } from 'react';
import FormInput from '../../reusable/formInput';
import _ from 'lodash';



const GroupItems = (props) => {
  const [answer, setAnswer] = useState(props.config);


  useEffect(() => {
    setAnswer(props.config);
  }, [props.config])

  const handleInputChange = (value, index, configFields) => {
    let newAnswers = [
      ...answer.slice(0, index), { ...configFields, answer: value }, ...answer.slice(index + 1)
    ]
    // console.log('new', newAnswers)
    props.onInputValueChange(newAnswers, index)
    setAnswer(newAnswers);

  };


  useEffect(() => {
  }, [mappingArray])

  let mappingArray = props?.config;
  return (
    <div className='card-wrapper'>
      {mappingArray?.map((item, index) => {
        return (

          <FormInput
            type={item.type}
            label={item.label}
            options={item.options}
            count={item.count}
            onInputValueChange={(e) => handleInputChange(e, index, item)}
            source_url={item?.source_url}
            value={item?.answer}
            dynamicWidth
            weight={item?.weight}
            item={item}
            itemId={props?.itemId}
            additionalId={index}
            groupIndex={props?.groupIndex}
            handleDirtyFlag={props.handleDirtyFlag}
            minValue={item?.min}
            maxValue={item?.max}
            hasError={item?.hasError}
            numOfAddMore={(num) => { }}
            key={index.toString()}
            required={item?.required}
            isGroupItem={true}
            onlyItems={false}
            localError={props.localError}
          />

        );
      })}
    </div>
  );
};

export default React.memo(GroupItems);
