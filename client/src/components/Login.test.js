import React from 'react';
import  { shallow, mount } from 'enzyme';
import { Login } from './Login';

describe("Login", () => {
    const mockLogin = jest.fn();
    const mockPush = jest.fn();
    let props = {
        login: mockLogin,
        history: {
            push: mockPush
        },
        authError: {
            isError: false,
            value: ''
        }
    };
    let login = shallow(<Login {...props} />);

    it('renders correctly', () => {
        expect(login).toMatchSnapshot();
    });

    describe('when form fields value changes', () => {
        beforeEach(() => {
            login = shallow(<Login {...props} />);
        });

        it('should set email on input change', () => {
            const value = "test@test.com";
            login.find('input').at(0).simulate('change', {
                target: { value }
            });
            expect(login.state('email').value).toEqual(value);
        });

        it('should set password on input change', () => {
            const value = "password!";
            login.find('input').at(1).simulate('change', {
                target: { value }
            });
            expect(login.state('password').value).toEqual(value);
        });
    });

    describe('when authentication Error', () => {
        beforeEach(() => {
            props.authError.isError = true;
            props.authError.value = "Authentication Fail";
            login = shallow(<Login {...props}/>);
        });

        it('renders correctly', () => {
            expect(login).toMatchSnapshot();
        });
    });

    describe('when valid from submission', () => {
        beforeEach(() => {
            login = mount(<Login {...props} />);
        });

        it('should submit the form correctly', () => {
            const user = {
                email: 'test@test.com',
                password: "password!"
            };
            login.setState({ email: { value: user.email, error: false } });
            login.setState({ password: { value: user.password, error: false } });            
            login.find('form').simulate('submit', {
                preventDefault: () => {}
            });       
            login.setProps({ isAuthenticated: true });     
            expect(mockLogin).toHaveBeenCalledWith(user);
            expect(mockPush).toHaveBeenCalledWith('/');
        });

        it('should render error when invalid form submission', () => {
            const user = {
                email: 'tesest.com',
                password: "pord!"
            };
            login.setState({ email: { value: user.email, error: false } });
            login.setState({ password: { value: user.password, error: false } });            
            login.find('form').simulate('submit', {
                preventDefault: () => {}
            });       
            expect(login.find('.auth__error').length).toEqual(2);            
        });
    });
});