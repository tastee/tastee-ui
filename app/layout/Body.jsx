import React from 'react';
import ButtonAction  from '../components/ButtonAction.jsx';
import FormGroup  from 'react-bootstrap/lib/FormGroup';
import FormControl  from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Select  from 'react-select/lib/Select';
import Tasty from 'tasty-core/app/tasty-core';

export default class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            browserSelected: '',
            tastyCode: 'go to "www.google.fr"'
        };
        this.options = [
            { value: 'chrome', label: 'Chrome' },
            { value: 'firefox', label: 'Firefox' }
        ];
        Tasty.loadAnalyser('/tmp/common-instructions.conf.tty')
    }
    browserChange(newValue) {
        this.setState({
            browserSelected: newValue
        });
    }
    scriptChange(newValue) {
        this.setState({
            tastyCode:  newValue.target.value
        });
    }
    startDriver() {
        Tasty.init(this.state.browserSelected.value);
    }
    execute() {
        Tasty.execute(this.state.tastyCode);
    }
    stop() {
        Tasty.stop();
    }
    render() {
        return (
            <form>
                <p class="lead">This interface allow to test your tasty script in live !</p>
                <FormGroup>
                    <ControlLabel>1 - Insert your script: </ControlLabel>
                    <FormControl componentClass="textarea" placeholder="go to wwww.google.fr" value={this.state.tastyCode} onChange={this.scriptChange.bind(this) } />
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
                        <ButtonAction onClick={this.startDriver.bind(this) } glyph="play"></ButtonAction>
                        <ButtonAction onClick={this.execute.bind(this) } glyph="flash"></ButtonAction>
                        <ButtonAction onClick={this.stop} glyph="stop"></ButtonAction>
                    </ButtonToolbar>
                </FormGroup>
            </form>
        )
    }
};