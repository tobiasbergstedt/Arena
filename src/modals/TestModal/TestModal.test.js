import React from 'react';
import { shallow } from 'enzyme';
import TestModal from './TestModal';

it('renders without crashing', () => {
  shallow(<TestModal />);
});
