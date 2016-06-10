import React from 'react';
import ButtonAction  from '../components/ButtonAction.jsx';
import ButtonToolbar  from 'react-bootstrap/lib/ButtonToolbar';
import Tooltip  from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger  from 'react-bootstrap/lib/OverlayTrigger';
import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import Select  from 'react-select/lib/Select';

var options = [
    { value: 'chrome', label: 'Chrome' },
    { value: 'firefox', label: 'Firefox' }
];

export default class Body extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
                browserSelected: ''
          };
    }
    
    browserChange(newValue) {
         this.setState({
            browserSelected: newValue
        });
    }
    startDriver() {
        console.log('alert');
    }
    execute() {
        console.log('alert');
    }
    stop() {
        console.log('alert');
    }
    render() {
        return (
            <div id="container">
                <Grid>
                    <Row className="show-grid">
                        <span>Script to execute: </span>
                    </Row>
                    <Row className="show-grid">
                        <textarea id="scriptToExecute"></textarea>
                    </Row>
                    <Row className="show-grid">
                        <Select
                            name="form-field-name"
                            value={this.state.browserSelected}
                            options={options}
                            onChange={this.browserChange.bind(this)}
                            />
                    </Row>
                    <Row className="show-grid">
                        <ButtonToolbar>                        
                            <ButtonAction glyph="play"></ButtonAction>
                            <ButtonAction glyph="flash"></ButtonAction>
                            <ButtonAction glyph="stop"></ButtonAction>                
                        </ButtonToolbar>
                    </Row>
                </Grid>
            </div>
        )
    }
};