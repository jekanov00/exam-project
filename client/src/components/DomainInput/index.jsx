import React from 'react';

function DomainInput(props) {
  const {
    classes,
    header,
    text,
    type,
    input: { value, checked },
  } = props;

  const handleChange = (event) => {
    props.input.onChange(event);
  };

  return (
    <>
      <label
        htmlFor={value}
        className={`${classes.radioInput} ${checked ? classes.radioActive : ''}`}>
        <input {...props.input} type={type} id={value} onChange={handleChange} />
        <h3 className={classes.radioHeader}>{header}</h3>
        <p className={classes.radioText}>{text}</p>
      </label>
    </>
  );
}

export default DomainInput;
