import React from 'react';
import ReactDOM from 'react-dom';
import '../../bootstrap-3.4.1/css/bootstrap.css';

export class CreatePhones extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <Title  text="Create Phones"/>
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

        this.state = { 
            counter: 0,
        };
        this.GetOneMoreField=this.GetOneMoreField.bind(this);
        this.Submit=this.Submit.bind(this);
    }  

    Submit(){
        let json = {};

        let brand = document.getElementById('brand-text').value;
        let model = document.getElementById('model-text').value;
        let collection = "phones";
        let entryName = brand + "-" + model;

        if (brand != "" && model != ""){
            json["brand"] = brand;
            json["model"] = model;
            if (this.state.counter > 0) {
                for (let i = 0; i < this.state.counter; i++){
                    let val = document.getElementById("phones-prop-" + (i + 1)).value;
                    if (val != ""){
                        json[val] = document.getElementById("phones-text-" + (i + 1)).value;
                    }
                }
            }
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
                if (`${xhttp.response}` == "Submitted!"){document.getElementById('SaveMessage').innerHTML = "<p style=\"background-color: #00FF00\">Submitted the " + brand + " " + model + "</p>";}
              };
        }
        else {document.getElementById('SaveMessage').innerHTML = "<p style=\"background-color: #FF0000\">Brand and/or model is not defined.</p>";}
    }

    GetOneMoreField(){
        this.state.counter++;
        document.getElementById('SaveMessage').innerHTML = "<p style=\"background-color: #00FF00\">Field added</p>";
        ReactDOM.render(<Inputfield id={this.state.counter}/>, document.getElementById('ExtendInputFields').appendChild(document.createElement('div')));
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
                            <p>model - 6 <br/>
                                brand - Oneplus <br/>
                                price - It is for sale for €600 in our store. <br/>
                                pricetag - 600 </p>
                            <p>Other properties can be defined like this:<br/>camera - This phone has a 20mp camera. Therefore it makes beautifull pictures<br/>These properties could be anything (par example: display, os, ect.)</p>
                            
                           <br/> <h4><strong>What is the Property - What to say about the property</strong></h4>
                            <div>
                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="brand-prop" name="model-prop" value="brand" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>

                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="brand-text" name="model-prop" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>
                            </div>
                            <br/><br/>
                            <div>
                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="model-prop" name="model-prop" value="model" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>

                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <input type="text" id="model-text" name="model-prop" className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                                </div>
                            </div>
                            <br/>
                            <div id='ExtendInputFields' />
                            <br/>
                            <div>
                                <div onClick={this.GetOneMoreField} className='col-xs-6 col-sm-6 col-md-6 col-lg-6' style={{backgroundColor: 'rgba(80, 255, 80, 1)', cursor: 'pointer'}}>
                                    <p className="col-xs-offset-5 col-sm-offset-5 col-md-offset-5 col-lg-offset-5"><strong>Add field</strong></p>
                                </div>
                                
                                <div onClick={this.Submit} className='col-xs-6 col-sm-6 col-md-6 col-lg-6' style={{backgroundColor: 'rgba(80, 80, 255, 1)', cursor: 'pointer', margin: 'auto'}}>
                                    <p id="pid" className="col-xs-offset-5 col-sm-offset-5 col-md-offset-5 col-lg-offset-5"><strong>Submit</strong></p>
                                </div>      
                            </div>
                            
                            <br/><br/>
                        </div>
                    </div>
    );
    }
}

// takes an id and makes a static name id input type to be able to create field dynamicly.
class Inputfield extends React.Component {
    render() {
        return (
            <div>
                <br/>
                <div>
                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                        <input type="text" id={"phones-prop-" + this.props.id} className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                    </div>

                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                        <input type="text" id={"phones-text-" + this.props.id} className="col-xs-12 col-sm-12 col-md-12 col-lg-12"/>
                    </div>
                </div>
                <br/>
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
