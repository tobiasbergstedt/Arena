import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';

it('renders without crashing', () => {
  shallow(<Profile />);
});
