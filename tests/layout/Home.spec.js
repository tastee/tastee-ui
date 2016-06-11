jest.unmock('tasty-core/app/tasty-core');
jest.unmock('../../app/layout/Home.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../../app/layout/Home.jsx';
import Footer from '../../app/layout/Footer.jsx';
import Body from '../../app/layout/Body.jsx';
import Header from '../../app/layout/Header.jsx';
import TestUtils from 'react-addons-test-utils';

describe('Home', function () {


    it('generate Home page with header,body and header', function () {
        const home = TestUtils.renderIntoDocument(<Home/>);

        expect(TestUtils.scryRenderedDOMComponentsWithTag(home, 'div').length).toBe(1);
        expect(TestUtils.scryRenderedComponentsWithType(home, Footer).length).toBe(1);
        expect(TestUtils.scryRenderedComponentsWithType(home, Body).length).toBe(1);
        expect(TestUtils.scryRenderedComponentsWithType(home, Header).length).toBe(1);

    });
});