import React from 'react';
import { shallow } from 'enzyme';
import EditName from './EditName';

it('renders without crashing', () => {
  shallow(<EditName />);
});
