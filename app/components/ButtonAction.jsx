import React from 'react';
import Glyph  from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

export default class ButtonAction extends React.Component {
    render() {
        return <Button onClick={this.props.onClick} className="btn-default">
            <Glyph glyph={this.props.glyph}/>
        </Button>
    }
}