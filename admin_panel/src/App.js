import React from 'react';
import {Content} from './components/body';
import './bootstrap-3.4.1/css/bootstrap.css';

export class App extends React.Component {
    render() {
        return (
            <div className='page' style={{overflowX: 'hidden', overflowY: 'auto'}}>
              <Content/>
            </div>
        );
    }
}
