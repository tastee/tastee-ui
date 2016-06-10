jest.unmock('../../app/layout/Header.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Header from '../../app/layout/Header.jsx';

describe('Header', function () {

    it('generate PageHeade with title', function () {
        const header = TestUtils.renderIntoDocument(<Header/>);
        const headerNode = ReactDOM.findDOMNode(header);

        expect(headerNode.textContent).toEqual('Tasty Ui');

    });
});