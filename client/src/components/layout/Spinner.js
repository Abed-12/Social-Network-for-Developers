import React, { Fragment } from "react";
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img 
                src={spinner} 
                style={{ width: '50px', margin: '200px auto', display: 'block' }}
                alt="Loading..."
            />
        </Fragment>
    );
};

export default Spinner;