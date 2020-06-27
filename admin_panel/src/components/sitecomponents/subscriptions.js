import React from 'react';
import '../../bootstrap-3.4.1/css/bootstrap.css';

export class CreateSubscriptions extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <Title  text="Create Subscriptions"/>
                <br/>
                <div className='row'>
                    <Stripe />
                        <Context/>
                    <Stripe />
                    <br/>
                </div>
            </div>
        );
    }
}


class Context extends React.Component {

    constructor(props) {
        super(props);
        this.Submit=this.Submit.bind(this);
    }

    Submit(){
        let json = {};

        let datasize = document.getElementById('sub-text-data').value;
        let price = document.getElementById('sub-text-price').value;
        let collection = "subscriptions";
        let entryName = datasize + "GB";

        if (datasize != "" && price != ""){
            json["datasize"] = datasize;
            json["price"] = price;

            let myjson = {};
            myjson["collection"] = collection;
            myjson["entryName"] = entryName;
            myjson["context"] = json;
            let jsonstr = JSON.stringify(myjson);
            var xhttp;
            xhttp=new XMLHttpRequest();
            xhttp.open("POST", "https://projectd.caslayoort.nl/api/firebase", true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(jsonstr);
            xhttp.onload = function() {
                if (`${xhttp.response}` == "Submitted!"){document.getElementById('SaveMessage').innerHTML = "<p style=\"background-color: #00FF00\">Submitted: " + datasize + "GB data for " + price + " euro/month.</p>";}
              };
        }
        else {document.getElementById('SaveMessage').innerHTML = "<p style=\"background-color: #FF0000\">Data size and/or price is not defined.</p>";}
    }

    render() {
        return (
            <div className='row'>
                        <div className='
                            col-xs-10 col-sm-10 col-md-10 col-lg-10
                            col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1
                        '>
                            <br/>
                            <div id="SaveMessage" />
                            <br/>
                            <p>Define these like this:</p>
                            <p>data size - 6 <br/>
                                price - 20 <br/>
                                The datasize is defined in GB and the price is defined in euros.</p>

                           <br/> <h4><strong>Field - Value</strong></h4>

                            <div>
                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="sub-prop-data" value="data size"  name="data-prop" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>

                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="sub-text-data" name="data-text" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>
                            </div><br/> <br/>

                            <div>
                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="sub-prop-price" value="price"  name="price-prop" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>

                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="sub-text-price" name="price-text" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>
                            </div><br/> <br/> 

                            <br/>
                            <div onClick={this.Submit} className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={{backgroundColor: 'rgba(80, 80, 255, 1)', cursor: 'pointer', margin: 'auto'}}>
                                <p className="col-xs-offset-6 col-sm-offset-6 col-md-offset-6 col-lg-offset-6"><strong>Submit</strong></p>
                            </div>         
                            <br/>
                            
                            <br/>
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
                    <h1>{this.props.text}</h1>
                    <br/>
                </div>
            </div>
    );
    }
}

class Stripe extends React.Component {
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='
                        col-xs-10 col-sm-10 col-md-10 col-lg-10
                        col-xs-offset-1 col-sm-offset-1 col-md-offset-1 col-lg-offset-1
                        text-center cv_item-head
                    '>
                        <h3> </h3>
                    </div>
                </div>
            </div>
        );
    }
}
