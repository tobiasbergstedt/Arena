import React from 'react';
import { shallow } from 'enzyme';
import Dev from './Dev';

it('renders without crashing', () => {
  shallow(<Dev />);
});
