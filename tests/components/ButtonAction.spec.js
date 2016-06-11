jest.unmock('../../app/components/ButtonAction.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ButtonAction from '../../app/components/ButtonAction.jsx';
import Glyph  from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

describe('ButtonAction', function () {

    it('generate Button with Glyph', function () {
        const button = TestUtils.renderIntoDocument(<ButtonAction glyph=""/>);
        const buttonNode = ReactDOM.findDOMNode(button);


        expect(TestUtils.scryRenderedDOMComponentsWithTag(button, 'button').length).toBe(1);
        expect(TestUtils.scryRenderedComponentsWithType(button, Button).length).toBe(1);
        expect(TestUtils.scryRenderedComponentsWithType(button, Glyph).length).toBe(1);
    });
    
});