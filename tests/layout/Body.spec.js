jest.unmock('../../app/layout/Body.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import Body from '../../app/layout/Body.jsx';
import Header from '../../app/layout/Header.jsx';
import TestUtils from 'react-addons-test-utils';

describe('Home', function () {


    it('generate Body with form', function () {
        const body = TestUtils.renderIntoDocument(<Body/>);
        expect(TestUtils.scryRenderedDOMComponentsWithTag(body, 'form').length).toBe(1);
    });
});