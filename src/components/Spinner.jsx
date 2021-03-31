import React, {Fragment} from 'react'
import "./Spinner.css";

const Spinner = () => {
    return ( 
        <Fragment>
            <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
            </div>
        </Fragment>
     );
}
 
export default Spinner;