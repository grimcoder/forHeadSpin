import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import input_data from './data.js'
import Selections from './Selections.js'


class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: input_data};
        this.deleteTag = this.deleteTag.bind(this);

        this.selectionSelected = this.selectionSelected.bind(this);
        this.selectionUnSelected = this.selectionUnSelected.bind(this);
    }

    deleteTag(n, it) {
        var downloads = this.state.data.downloads;
        var row = downloads[n];
        row.tags = row.tags.filter((p, m)=> {
            return JSON.stringify(it) !== JSON.stringify(p);
        });
        this.state.data.downloads = downloads;
        this.setState({data: this.state.data});
    }

    addTag(n) {
        var addTag = true;
        this.setState({addTag: addTag, tagRow: n});
    }

    addTagComplete() {

        var downloads = this.state.data.downloads;

        var row = downloads[this.state.tagRow];
        var name = this.refs.addTagName.value;
        var value = this.refs.addTagValue.value;
        var newTag = {}
        newTag['name'] = name;
        newTag['value'] = value;
        row.tags.push(newTag);
        this.setState({addTag: false, tagRow: undefined, data: this.state.data});
    }

    selectionSelected(item){
        this.setState({isSelected: true, selection: item});
    }

    selectionUnSelected(item){
        this.setState({isSelected: false, selection: undefined});
    }

    render() {

        var downloads = this.state.data.downloads;

        var tags = this.state.data.selections;

        var dwnldList = downloads.map((i, n)=> {

            var isSelected = ''

            if (this.state.isSelected){
                var s = this.state.selection;

                isSelected = i.tags.filter((tg)=>{
                    return s.filter((d)=>{
                            return d.name == tg.name && d.value == tg.value;
                        }).length > 0;
                }).length > 0 ? 'selected' : '';
            }

            var tagsList = i.tags.map((it, m)=> {
                return (<td key={m}><span>{it['name']}={it['value']}
                    <button onClick={this.deleteTag.bind(this, n, it)}>☠</button></span>
                </td>)
            })

            var addRow = this.state.addTag && this.state.tagRow == n ?
                <span>
                    <input placeholder="name" type="text" ref="addTagName"></input>
                    <input placeholder="value" type="text" ref="addTagValue"></input>
                    <button onClick={this.addTagComplete.bind(this)}>Add</button>
                </span>
                : null;

            return (
                <tr key={n} className={isSelected}>
                    <td className="cell"><span>Size: {i.size} </span></td>
                    <td className="cell"><span>Time: {i.time}</span></td>
                    {tagsList}
                    <td>
                        <button onClick={this.addTag.bind(this, n)}>+</button>
                    </td>
                    {addRow}
                </tr>

            );
        });

        return (
            <div>

                <table>
                    <tbody>
                    {dwnldList}
                    </tbody>
                </table>

                <hr />

                <Selections state={this.state}
                            selectionSelected={this.selectionSelected}
                            selectionUnSelected={this.selectionUnSelected} />
            </div>
        );
    }
}

ReactDOM.render(
    <Sessions />,
    document.getElementById('root')
);

