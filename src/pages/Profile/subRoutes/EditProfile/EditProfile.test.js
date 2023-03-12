import React from 'react';
import { shallow } from 'enzyme';
import EditProfile from './EditProfile';

it('renders without crashing', () => {
  shallow(<EditProfile />);
});
