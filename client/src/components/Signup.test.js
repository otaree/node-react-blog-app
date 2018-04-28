import React from 'react';
import { shallow, mount } from 'enzyme';

import { Signup } from './Signup';

describe('Signup', () => {
    const mockSignup = jest.fn();
    const mockPush = jest.fn();
    let props = {
        signup: mockSignup,
        history: {
            push: mockPush
        },
        authError: {
            isError: false,
            value: ''
        }
    }
    let signup = shallow(<Signup {...props} />);

    it('renders correctly', () => {
        expect(signup).toMatchSnapshot();
    });

    describe('when form fields value changes', () => {
        beforeEach(() => {
            signup = shallow(<Signup {...props} />);
        });

        it('should set email on input change', () => {
            const value = "test@test.com";
            signup.find('input').at(0).simulate('change', {
                target: { value }
            });
            expect(signup.state('email').value).toEqual(value);
        });

        it('should set password on input change', () => {
            const value = "password!";
            signup.find('input').at(1).simulate('change', {
                target: { value }
            });
            expect(signup.state('password').value).toEqual(value);
        });
    });
    describe('when authentication Error', () => {
        beforeEach(() => {
            props.authError.isError = true;
            props.authError.value = "Authentication Fail";
            signup = shallow(<Signup {...props}/>);
        });

        it('renders correctly', () => {
            expect(signup).toMatchSnapshot();
        });
    });

    describe('when valid from submission', () => {
        beforeEach(() => {
            signup = mount(<Signup {...props} />);
        });

        it('should submit the form correctly', () => {
            const user = {
                email: 'test@test.com',
                password: "password!"
            };
            signup.setState({ email: { value: user.email, error: false } });
            signup.setState({ password: { value: user.password, error: false } });            
            signup.setState({ password2: { value: user.password, error: false } });
            signup.find('form').simulate('submit', {
                preventDefault: () => {}
            });       
            signup.setProps({ isAuthenticated: true });     
            expect(mockSignup).toHaveBeenCalledWith(user);
            expect(mockPush).toHaveBeenCalledWith('/');
        });

        it('should render error when invalid form submission', () => {
            const user = {
                email: 'tesest.com',
                password: "pord!"
            };
            signup.setState({ email: { value: user.email, error: false } });
            signup.setState({ password: { value: user.password, error: false } });            
            signup.setState({ password2: { value: user.password, error: false } });
            signup.find('form').simulate('submit', {
                preventDefault: () => {}
            });       
            expect(signup.find('.auth__error').length).toEqual(2);            
        });
    });
});