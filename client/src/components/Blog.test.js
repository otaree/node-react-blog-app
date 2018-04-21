import React from 'react';
import { shallow } from 'enzyme';
import { Blog } from './Blog';

describe('Blog', () => {
    let props = {
        blogs: [
            {
                _id: '1',
                title: "First Title",
                author: "Tester",
                body: "First's body",
                published: false
            },
            {
                _id: '2',
                title: "Second Title",
                author: "Tester",
                body: "Second's body",
                published: true,
                publishedAt: 1000
            }
        ],
        match: {
            params: {
                id: '2'
            }
        }
    };

    let blog = shallow(<Blog {...props} />);

    it('renders properly', () => {
        expect(blog).toMatchSnapshot();
    });

    it('displays the correct blog title', () => {
        expect(blog.find('h2').text()).toEqual(props.blogs[1].title);
    });

    it('displays edit button', () => {
        expect(blog.find('.btn-edit').length).toEqual(1);
    });
});