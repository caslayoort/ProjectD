import React from "react";
import '../bootstrap-3.4.1/css/bootstrap.css';

import {Home} from './home';

export class Content extends React.Component {
    render() {
        return (
            <div className='content_container'>
                <div>
                    <div ><Home/></div>
                    <br />
                </div>
            </div>
        );
    }
}