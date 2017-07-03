import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

 class Selections extends React.Component {
    constructor(props) {

        super(props);
        this.state = props.state;


    }

     addSelection(){
        var a = 10;
     }



render(){

    var selections = this.state.data.selections;
    var sessions = this.state.data.downloads;



    var sList = selections.map((s, n)=>{


        var selected = sessions.filter((sess, p)=>{

            var tags = sess.tags;

            return tags.filter((fl)=>{

                return s.filter((d)=>{
                    return d.name == fl.name && d.value == fl.value;
                }).length > 0;

            }).length > 0;

        });

        var objNum = selected.length;

        var avgTime = selected.reduce((k, sn)=>{
                return (k+sn.time)
            },0) / selected.length;

        var avgData = selected.reduce((k, sn)=>{
                return (k+sn.size)
            },0) / selected.length;


        var avgSpeed = selected.reduce((k, sn)=>{
                return (k+sn.size / sn.time)
            },0) / selected.length;


        var list = s.map((i, m)=>{return i.name + '=' + i.value }).join(' or ');

        return (
        <div onMouseOver={this.props.selectionSelected.bind(this, s)} onMouseOut={this.props.selectionUnSelected.bind(this, s)}>
            <div className="selectionHeader">{list}</div>
            <div>{objNum} objects in this selection.</div>
            <div><b>Average time: {avgTime}</b></div>
            <div><b>Average data: {avgData}</b> </div>
            <div><b>Average speed: {avgSpeed} </b></div>

        </div>)
    })

    return (<div>
        <span className="Header">Selections</span><button onClick={this.addSelection}>+</button>

        {sList}

    </div>)
    }

}



export default Selections;