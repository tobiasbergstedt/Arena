import React from 'react';
import { shallow } from 'enzyme';
import Beneficiary from './Beneficiary';

it('renders without crashing', () => {
  shallow(<Beneficiary />);
});
