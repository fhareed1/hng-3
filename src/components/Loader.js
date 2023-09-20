import React from 'react';
import classes from './Loader.module.css'

const Loader = () => {
  return (
    <>
      <div className={classes.spinner}>
        <div className={classes.dot1}></div>
        <div className={classes.dot2}></div>
      </div>
    </>
  );
};

export default Loader;
