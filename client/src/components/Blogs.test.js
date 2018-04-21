import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { Blogs } from './Blogs';

describe('Blogs', () => {
    const props = {
        blogs: [{
        id: '1',
        title: "First title"
    }, {
        id: '2',
        title: "Second title"
    }]
    };

    const blogs = shallow(<Blogs  {...props} />);

    it('render properly', () => {
        expect(blogs).toMatchSnapshot();
    });

    describe('when there are valid blogs props', () => {
        it('should show correct numbers of `Link`', () => {
            expect(blogs.find(Link).length).toEqual(2);
        });
    });
});


