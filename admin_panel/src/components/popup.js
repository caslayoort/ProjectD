import React from "react";
import ReactDOM from 'react-dom';

//import your css stylesheet here:
import '../bootstrap-3.4.1/css/bootstrap.css';

export class Popup extends React.Component {

    constructor(props) {
        super(props);

        this.state = { 
            width: '',
            height: '',
            use_height_from_style: false,
            use_width_from_style: false,
            position: 'center',
            active: 'true'
         };
      }

    componentWillMount(){
        if (this.props.width){ 
            this.setState({
                use_width_from_style: true,
                width: this.props.width
            });
         }

        if (this.props.height){ 
            this.setState({
                use_height_from_style: true,
                height: this.props.height
            });
         }

         if (this.props.position){ 
            this.setState({
                position: this.props.position
            });
         }
    }

    componentDidMount(){
        let opacity = 0;
        function fadeIn() {
            opacity = opacity + 0.1;
            if (typeof(document.getElementById('popup')) != 'undefined' && document.getElementById('popup') != null) {
                document.getElementById('popup').style.opacity = opacity;
            }
            if ( opacity <= 0.9 ) {setTimeout(() => {  fadeIn(); }, 20);}
            else { return 0; }
        };
        
        fadeIn();
    }

    render() {

        const row = {
            width: '100%',
            display: 'table',
            content: ' ',
            clear: 'both'
        }

        const overlayDefaultStyle = {
            display: 'flex',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: '1',
            height: '100vh',
            width: '100vw',
        };
        
        
        var overlayStyle;
        if (this.props.backgroundColor){
            overlayStyle = {
                backgroundColor: this.props.backgroundColor
            };
        }

        const defaultstyle = {
            display: 'block',
            marginTop: 'auto',
            marginBottom: 'auto',
            zIndex: '1',
            overflowY: 'auto',
            overflowX: 'hidden',
        };

        var height,width;
        if (this.state.use_width_from_style) {
            width = {
                height: this.state.height,
                width: this.state.width,
            };
        }

        if (this.state.use_height_from_style) {
            height = {
                height: this.state.height,
                width: this.state.width,
            };
        }

        var pos;
        if (this.state.position === 'left') {
            pos = {
                marginRight: 'auto',
                left: '0'
            };
        } else if (this.state.position === 'right') {
            pos = {
                marginLeft: 'auto',
                left: '0'
            };
        } else if (this.state.position === 'top') {
            pos = {
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '0'
            };
        } else {
            pos = {
                marginLeft: 'auto',
                marginRight: 'auto',
            };
        }

        return (
            <div id='popup'
                className={this.props.backgroundClassName}
                style={Object.assign(overlayDefaultStyle, overlayStyle, this.props.backgroundStyle)}
                
            >
                <div
                    className={this.props.className}
                    style={Object.assign(defaultstyle, height, width, pos, this.props.style)}
                >
                    <div style={{position: "sticky", top: 0}}>
                        <Close/>
                    </div>
                    <div style={row}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export class Trigger extends React.Component {
    render(){
        const popupcontent = <div>{this.props.setContent}</div>;
        function action() {
            ReactDOM.render(
            <Popup
                /* styling */
                style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
                className='col-xs-10 col-sm-10 col-md-8 col-lg-6'
                height='75vh'
                backgroundColor='rgba(0, 0, 0, 0.8)'
            >{popupcontent}</Popup>, document.getElementById('root').appendChild(document.createElement('div')));
        }

        return (
            <div style={{cursor: 'pointer'}} onClick={action}>{this.props.children}</div>
        );
    }
}

export class Trigger2 extends React.Component {
    render(){
        const popupcontent = <div>{this.props.setContent}</div>;
        function action() {
            ReactDOM.render(
            <Popup
                /* styling */
                className='col-xs-12 col-sm-12 col-md-12 col-lg-12'
                height='100%'
                position='top'
                backgroundColor='rgba(0, 0, 0, 1)'
            >{popupcontent}</Popup>, document.getElementById('root').appendChild(document.createElement('div')));
        }

        return (
            <div style={{cursor: 'pointer'}} onClick={action}>{this.props.children}</div>
        );
    }
}

class Close extends React.Component {
    render(){
        const style = {
            cursor: 'pointer',
            color: '#5555FF',
            top: '0',
            right: '0',
            float: 'right',
            marginLeft: 'auto',
            postion: 'relative'
        };

        function action() {
            document.getElementById("popup").onclick = function() {
                return false;
            }

            function fadeOut(Opacity) {
                if (typeof(document.getElementById('popup')) != 'undefined' && document.getElementById('popup') != null) {
                    document.getElementById("popup").style.opacity = Opacity;
                    if ( Opacity >= 0.1 ) {setTimeout(() => {  fadeOut(Opacity - 0.1); }, 20);}
                    else {
                        document.getElementById("popup").remove();
                        return 0;
                    }
                }
            }
            fadeOut(1);
        }

        return (
            <div 
                style={style}
                onClick={action}
            >
                    <h3 style={{fontWeight: 'bold'}}>X</h3>
            </div>
        );
    }
}
