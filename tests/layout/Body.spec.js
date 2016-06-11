jest.unmock('tasty-core/app/tasty-core');
jest.unmock('../../app/layout/Body.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import Body from '../../app/layout/Body.jsx';
import Header from '../../app/layout/Header.jsx';
import TestUtils from 'react-addons-test-utils';

describe('Body', function () {

    it('generate Body with form', function () {
        const body = TestUtils.renderIntoDocument(<Body/>);

        const bodyNode = ReactDOM.findDOMNode(body);

        expect(body.state.tastyCode).toBe('go to "www.google.fr"');
        expect(body.state.browserSelected).toBe('');
        expect(TestUtils.scryRenderedDOMComponentsWithTag(body, 'form').length).toBe(1);
    });
    
    it('set tasty code in state if user change code', function () {
        const body = TestUtils.renderIntoDocument(<Body/>);
        var expectCode = 'go to "tata"';
        var textarea = TestUtils.findRenderedDOMComponentWithTag(body, 'textarea');
        TestUtils.Simulate.change(textarea, { target: { value: expectCode } });
        expect(body.state.tastyCode).toBe(expectCode);

    });
    
});