import React from 'react';
import { shallow } from 'enzyme';

import Auth from './Auth';

describe('Auth', () => {
    const auth = shallow(<Auth />);

    it('renders correctly', () => {
        expect(auth).toMatchSnapshot();
    });
});