jest.unmock('../../app/layout/Footer.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from '../../app/layout/Footer.jsx';

describe('Footer', function () {

    it('generate Button for close windows', function () {
        const footer = TestUtils.renderIntoDocument(<Footer/>);
        const footerNode = ReactDOM.findDOMNode(footer);

        expect(footerNode.textContent).toEqual('Close this Window');

    });
});