import React from 'react';
import { shallow } from 'enzyme';
import Mapbox from './Mapbox';

it('renders without crashing', () => {
  shallow(<Mapbox />);
});
