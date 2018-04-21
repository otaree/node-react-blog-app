import React from 'react';
import { shallow } from 'enzyme';
import { EditBlog } from './EditBlog';

const blogs = [
    {
        _id: '1',
        title: "First Title",
        body: "First body",
        author: "author1"
    },
    {
        _id: '2',
        title: "Second Title",
        body: "Second body",
        author: "author2"
    }
];

let editBlog, props, mockUpdateBlog, mockDeleteBlog, mockPush;

describe('EditBlog', () => {
    beforeEach(() => {
        mockUpdateBlog = jest.fn()        
        mockDeleteBlog = jest.fn();
        mockPush = jest.fn();
        props = {
            updateBlog: mockUpdateBlog,
            deleteBlog: mockDeleteBlog,
            history: {
                push: mockPush
            },
            blog: blogs[0],
            id: blogs[0]._id
        }
        editBlog = shallow(<EditBlog {...props} />);
        
    });

    it('renders properly', () => {
        expect(editBlog).toMatchSnapshot();
    });

    it('should handle `updateBlog`', () => {
        const updateData = {
            title: "Test Update",
            body: "Test body",
            author: "testAuthor",
            published: false
        };
        editBlog.find("Form").prop('onSubmit')(updateData);
        expect(mockPush).toHaveBeenLastCalledWith('/');
        expect(mockUpdateBlog).toHaveBeenLastCalledWith(blogs[0]._id, updateData);
    });

    it('should handle `deleteBlog`', () => {
        editBlog.find('.btn-delete').simulate('click');
        expect(mockPush).toHaveBeenLastCalledWith('/');
        expect(mockDeleteBlog).toHaveBeenLastCalledWith(blogs[0]._id);
    });
});