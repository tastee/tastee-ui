import React from 'react';
import ButtonAction  from '../components/ButtonAction.jsx';
import FormGroup  from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Select  from 'react-select/lib/Select';

export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            browserSelected: ''
        };
        this.options = [
            { value: 'chrome', label: 'Chrome' },
            { value: 'firefox', label: 'Firefox' }
        ]
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
            <form>
                <p class="lead">This interface allow to test your tasty script in live !</p>
                <FormGroup>
                    <ControlLabel>1 - Insert your script: </ControlLabel>
                    <FormControl componentClass="textarea" placeholder="go to wwww.google.fr" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>2 - Choose your browser: </ControlLabel>
                    <Select
                        name="form-field-name"
                        value={this.state.browserSelected}
                        options={this.options}
                        onChange={this.browserChange.bind(this) }
                        />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>3 - Play: </ControlLabel>
                    <ButtonToolbar>
                        <ButtonAction onClick={this.startDriver} glyph="play"></ButtonAction>
                        <ButtonAction onClick={this.execute} glyph="flash"></ButtonAction>
                        <ButtonAction onClick={this.stop} glyph="stop"></ButtonAction>
                    </ButtonToolbar>
                </FormGroup>
            </form>
        )
    }
};