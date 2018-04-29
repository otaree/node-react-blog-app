import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('App', () => {
    const app = shallow(<App />);

    it('render properly', () => {
        expect(app).toMatchSnapshot();
    });

    it("contains a Header component", () => {
        expect(app.find('Header').exists()).toBe(true);
    });

    it("contains a Main component", () => {
        expect(app.find('Main').exists()).toBe(true);
    });
});