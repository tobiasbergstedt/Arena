import React from 'react';
import { shallow } from 'enzyme';
import BottomAlert from './BottomAlert';

it('renders without crashing', () => {
  shallow(<BottomAlert />);
});
