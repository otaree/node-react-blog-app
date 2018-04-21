import React from 'react';
import { shallow } from 'enzyme';
import Form  from './Form';

describe('Form', () => {
    let form = shallow(<Form />);
    it('renders properly', () => {
        expect(form).toMatchSnapshot();
    });

    describe('when form field value changes', () => {
        beforeEach(() => {
            form = shallow(<Form />);
        });

        it('should set title on input change', () => {
            const value = "New Title";
            form.find('input').at(0).simulate('change', {
                target: { value }
            });
            expect(form.state('title').value).toEqual(value);
        });

        it('should set body on input change', () => {
            const value = "New Body";
            form.find('textarea').simulate('change', {
                target: { value }
            });
            expect(form.state('body').value).toEqual(value);
        });

        it('should set author on input change', () => {
            const value = "Author";
            form.find('input').at(1).simulate('change', {
                target: { value }
            });
            expect(form.state('author').value).toEqual(value);
        })
    });

    describe('when invalid form submission', () => {
        beforeEach(() => {
            form = shallow(<Form />);
        });

        it('should render error', () => {
            form.find('form').simulate('submit', {
                preventDefault: () => {}
            });
            expect(form).toMatchSnapshot();
        });

        it('should render set error true for all fields', () => {
            form.find('form').simulate('submit', {
                preventDefault: () => {}
            });
            expect(form.state('title').error).toEqual(true);
            expect(form.state('body').error).toEqual(true);
            expect(form.state('author').error).toEqual(true);
        });

        it('should render error for all expect title', () => {
            const value = 'New Title';
            form.find('input').at(0).simulate('change', {
                target: { value }
            });
            form.find('form').simulate('submit', {
                preventDefault: () => {}
            });
            expect(form.state('title').error).toEqual(false);
            expect(form.state('body').error).toEqual(true);
            expect(form.state('author').error).toEqual(true);
        })
    });

    describe('when valid form submission', () => {
        const mockOnSubmit = jest.fn();        
        beforeEach(() => {
            const props = {
                onSubmit: mockOnSubmit
            }
            form = shallow(<Form {...props} />);
        });
        
        it('should call props `onSubmit`', () => {
            const title = "Title";
            const body = "body";
            const author = "Author";
            form.find('input').at(0).simulate('change', {
                target: {
                    value: title
                }
            });
            form.find('textarea').simulate('change', {
                target: {
                    value: body
                }
            });
            form.find('input').at(1).simulate('change', {
                target: {
                    value: author
                }
            });
            form.find('form').simulate('submit', {
                preventDefault: () => {}
            });
            expect(mockOnSubmit).toHaveBeenCalledWith({
                title,
                body,
                author,
                published: false
            });
        });
    });
});