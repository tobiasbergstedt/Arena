import React from 'react';
import { shallow } from 'enzyme';
import Locations from './Locations';

it('renders without crashing', () => {
  shallow(<Locations />);
});
