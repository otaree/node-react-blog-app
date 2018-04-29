import React from 'react';
import { mount } from 'enzyme';

import { Logout } from './Logout';

describe("Logout", () => {
    const mockLogout = jest.fn();
    const mockPush = jest.fn();
    const props = {
        logout: mockLogout,
        history: {
            push: mockPush
        }
    };
    const logout = mount(<Logout {...props} />);

    it("should call logout function", () => {
        expect(mockLogout).toHaveBeenCalled();
        logout.setProps({ "isAuthenticated": true });
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});