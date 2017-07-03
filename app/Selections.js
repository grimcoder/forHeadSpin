import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

 class Selections extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.state;
    }

     addSelection(){
         this.setState({addSelection: true, tmpSelection: []})
     }

     deleteSelection(n){
         var selections = this.state.data.selections;
         selections.splice(n, 1);
         this.setState({})
     }

     addSelectionFinished(){

         var tmpSelection = this.state.tmpSelection;
         var selections = this.state.data.selections;
         selections.push(tmpSelection);
         this.setState({addSelection: false, tmpSelection: []})

     }

     addToSelection(){

         var tmpSelection = this.state.tmpSelection;
         var newName = this.refs.newSelectionName.value;
         var newValue = this.refs.newSelectionValue.value;

         this.refs.newSelectionName.value = '';
         this.refs.newSelectionValue.value = '';

         var newObj = {name: newName, value: newValue};
         tmpSelection.push(newObj);
         this.setState({addSelection: true, tmpSelection: tmpSelection})

     }

     cancelAddSelection(){
         this.setState({addSelection: false, tmpSelection: []})
     }

render(){

    var selections = this.state.data.selections;
    var sessions = this.state.data.downloads;

    var tmpSelectionList = !this.state.addSelection ?  undefined :
        this.state.tmpSelection.map((sel)=>{

          return <span>{sel.name}={sel.value}</span>

        });



    var addSelectionArea = !this.state.addSelection ?  undefined :
        <div>

            <span>
                <input ref="newSelectionName" type="text"/>
                <input ref="newSelectionValue" type="text"/>
                <button  onClick={this.addToSelection.bind(this)}>Add to selection</button>
            </span>

            <div>{tmpSelectionList}</div>

            <div>
                <button onClick={this.addSelectionFinished.bind(this)}>Add selection</button>
                <button onClick={this.cancelAddSelection.bind(this)}>Cancel</button>
            </div>

        </div>;


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
        <div className="selectionDiv" key={n} onMouseOver={this.props.selectionSelected.bind(this, s)}
             onMouseOut={this.props.selectionUnSelected.bind(this, s)}>

            <div className="selectionHeader">{list}
                <button onClick={this.deleteSelection.bind(this, n)}>☠</button>
            </div>

            <div>{objNum} objects in this selection.</div>
            <div><b>Average time: {avgTime}</b></div>
            <div><b>Average data: {avgData}</b> </div>
            <div><b>Average speed: {avgSpeed} </b></div>

        </div>)
    })

    return (<div>
        {addSelectionArea}
        <span className="Header">Selections</span><button onClick={this.addSelection.bind(this)}>+</button>

        {sList}

    </div>)
    }

}



export default Selections;