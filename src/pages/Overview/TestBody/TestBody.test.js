import React from 'react';
import { shallow } from 'enzyme';
import TestBody from './TestBody';

it('renders without crashing', () => {
  shallow(<TestBody />);
});
