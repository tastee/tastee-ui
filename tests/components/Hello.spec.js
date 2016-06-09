jest.unmock('../../app/components/Hello.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Hello from '../../app/components/Hello.jsx';

describe('Hello', function () {

    it('generate h1 with Hi text', function () {
        const hello = TestUtils.renderIntoDocument(<Hello />);
        const checkboxNode = ReactDOM.findDOMNode(hello);

        expect(checkboxNode.textContent).toEqual('Hi');

    });
});