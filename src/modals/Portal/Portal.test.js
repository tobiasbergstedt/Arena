import React from 'react';
import { shallow } from 'enzyme';
import Portal from './Portal';

it('renders without crashing', () => {
  shallow(<Portal />);
});
