import React from 'react';

class TexTyper extends React.Component{

    state= {
        text: this.props.text.substr(0, 0),
        counter: -1,
    };
    render(){
        return <span id="thirdWorld">{this.state.text}</span>
    }
    componentDidMount(){
        this.id = setInterval(() => {
            const counter = this.state.counter+1;

            this.setState ({
                counter: counter,
                text: this.props.text.substr(0, counter+1),
            });

            if(this.state.counter === 8){
                clearInterval(this.id);
            }
        }, 800)
    }
}

class Home extends React.Component{
    render(){
        return <div>
            <div className="fatPig"></div>
            <div className="text"><span id="firstWorld">Track</span> <span id="secondWorld">Your</span>
                <TexTyper text="Intake!"/>
            </div>
        </div>
    }
}
export default Home;
