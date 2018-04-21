import React from 'react';
import { shallow } from 'enzyme';
import { CreateBlog } from './CreateBlog';

describe('CreateBlog', () => {
    const mockCreateBlog = jest.fn();
    const mockPush = jest.fn();
    const props = {
        createBlog: mockCreateBlog,
        history: {
            push: mockPush
        }
    };

    const createBlog = shallow(<CreateBlog {...props} />);

    it('renders correctly', () => {
        expect(createBlog).toMatchSnapshot();
    });

    it('should handle `createBlog`', () => {
        const blogData = {
            title: "Test Title",
            body: "Test body",
            author: "tester",
            published: false
        };
        createBlog.find('Form').prop('onSubmit')(blogData);
        expect(mockPush).toHaveBeenLastCalledWith('/');
        expect(mockCreateBlog).toHaveBeenLastCalledWith(blogData);
    });
});