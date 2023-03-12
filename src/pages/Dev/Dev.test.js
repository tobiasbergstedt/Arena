import React from 'react';
import { shallow } from 'enzyme';
import Overview from './Dev';

it('renders without crashing', () => {
  shallow(<Overview />);
});
