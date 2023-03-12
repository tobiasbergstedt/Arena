import React from 'react';
import { shallow } from 'enzyme';
import SubPage from './SubPage';

it('renders without crashing', () => {
  shallow(<SubPage />);
});
