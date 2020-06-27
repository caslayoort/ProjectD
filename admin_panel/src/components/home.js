import React from 'react';
import '../bootstrap-3.4.1/css/bootstrap.css';
import {Trigger} from './popup';
import {CreatePhones} from './sitecomponents/phones.js';
import {CreateSubscriptions} from './sitecomponents/subscriptions.js';

export class Home extends React.Component {
    render() {
        return (
            <div className='container' style={{overflow: 'hidden'}}>
                <Title/>
                <br/>
                <div className='row'>
                            <Container
                                title='Create Phones'
                                shortDescription='Create a new phone in the firebase database.'
                            >
                                <CreatePhones />
                            </Container>

                            <Container
                                title='Create Subscriptions'
                                shortDescription='Create a new subscription inside the firebase database.'
                            >
                                <CreateSubscriptions />
                            </Container>
                </div>
            </div>
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='
                    col-xs-12 col-sm-12 col-md-10 col-lg-10
                    col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-1
                    text-center
                '>
                    <h1>Admin panel</h1>
                    <br/>
                    <h3>Features:</h3>
                    <br/>
                </div>
            </div>
    );
    }
}

class Container extends React.Component {
    render() {
        const content = <div>{this.props.children}</div>;
        return (
            <div className='
            col-xs-8 col-sm-8 col-md-8 col-lg-8
            col-xs-offset-2 col-sm-offset-2 col-md-offset-2 col-lg-offset-2
            '>
                <Trigger setContent={content}>
                    <div className='row'>
                        <div className='
                            col-xs-12 col-sm-12 col-md-12 col-lg-12
                            ervaring_component_head text-center
                        '>
                            <h4><strong>{this.props.title}</strong></h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='
                            col-xs-12 col-sm-12 col-md-12 col-lg-12
                            ervaring_component_body
                        '>
                            <p>{this.props.shortDescription}</p>
                        </div>
                    </div>
                </Trigger>
                <br/>

            </div>
        );
    }
}
