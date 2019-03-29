import React, { Component } from 'react';
import "./Ballot.css";
import axios from "axios";
/*
Comonent Breakdown:
 - Infobox
  - Vote Status (Open, Closed)
  - Vote Name, Description, Time
 - Voting Box
   - Items
 - Submit
*/


/**
 * @class DataHandling
 * Contains the methods for processing the front-end data and interacting with back-end.
 * Has no front-end operations, handles all other client-side operations.
 */
class DataHandling {
    main(){
        let data = {
            name: "kanda",
            sessionID: "1023102390"
        }
        let res = axios.post("/submit", data);
        console.log(res);
    }
}



/**
 * @param {String} name Max 63chars
 * @param {String} desc Max 255 chars
 * @param {String} status
 */
class InfoBox extends Component
{
    render()
    {
        return (
            <div id="infobox">
            <h2 id="infoname">{this.props.name.slice(0,64)}</h2>
            <h4 id="infodesc">{this.props.desc.slice(0,256)}</h4>
            {this.status()}
            </div>
        )
    }

    status() {
        if (this.props.status === "Open") {
            return <p 
                    id="infostat"
                    style={{color: "green"}}><b>Open</b></p>
        } else if (this.props.status === "Closed") {
            return <p 
                    id="infostat"
                    style={{color: "red"}}><b>Closed</b></p>
        }
        else {
            return <p id="infostat"><b>{this.props.status}</b></p>
        }
    }
}

function optionButton(props, callBack) { 
    // props = {displayName, [desc], [name]}
    if (!props.hasOwnProperty("name"))
        props.name = props.displayName;
    if (!props.hasOwnProperty("desc"))
        props.desc = " ";
    else
        props.desc = props.desc.slice(0,64);

    let className = "optionButton";
    if (props.name === props.sel) 
        className = "optionButtonSelected"
    return (
        <button id={props.name} className={className} type="radio" 
                name="optionButton" onClick={buttonClicked}>
            <h4>{props.displayName}</h4>
            <h6>{props.desc}</h6>
        </button>
    );
    function buttonClicked(e) {
        e.preventDefault();
        callBack(props);
        // can hold whether or not selected in a variable
    }
}

function submitButton(callBack) {
    // props = {callBack} callback
    return (
        <button id="vote-submit" type="button" onClick={buttonClicked} >
            <text id="submitText">Submit</text>
        </button>
    );

    function buttonClicked(e) {
        e.preventDefault();
        callBack();
    }
}

class VoteBox extends Component
{ // props.options
    constructor() {
        super();
        this.state = {
            selected: "none"
        };
        this.options = [];
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        this.options = [];
        return (
            <div>
                <div style={{height: "10px", overflow:"hidden"}} />
                {this.renderOptions()}
                <div style={{height: "2px"}}/>
                {submitButton(this.onSubmit)}
            </div>
        )
    }

    renderOptions() {
        for (let i = 0; i < this.props.options.length; i++) {
            this.options.push(<div style={{height: "2px"}}/>);
            this.props.options[i].sel = this.state.selected;
            this.options.push(optionButton(this.props.options[i], this.handleClick));
            // need to adjoin all buttons
        }
        return this.options;
    }
    
    handleClick(btn) {
        this.setState({
            selected: btn.name
        });
    }

    onSubmit() {
        let dt = new DataHandling();
        dt.main();
    }
}



class Ballot extends Component 
{
    constructor() {
        super();
        this.state = {
            status: "Open"
        }
    }

    render()
    {
        let opt = [
            {
                displayName: "Abstain", 
                desc: "Choose to abstain from voting.",
                name: "abs" }, 
            {
                displayName: "Yes", 
                desc: "Choose to Vote Yes.",
                name: "yes" 
            },
            {
                displayName: "No", 
                desc: "Choose to Vote No.",
                name: "no" 
            },
            {
                displayName: "Partial", 
                desc: "Choose to give partial amount..",
                name: "part" 
            }
        ]; // end opt
        return (
            <div className="container">
            <InfoBox 
                name="Change the Captains Policy" 
                desc="This would entail changing the date and this is actually just a test of the app."
                status={this.state.status}
            />
            <div style={{height: "10ox"}} />
            <VoteBox options={opt} />
            </div>
        )
    }

    closeVote() {
        this.setState({
            status: "Closed"
        });
    }

    openVote(){
        this.setState({
            status: "Open"
        });
    }
      
}

export default Ballot;