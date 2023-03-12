import React from 'react';
import { shallow } from 'enzyme';
import EditPhoneNumber from './EditPhoneNumber';

it('renders without crashing', () => {
  shallow(<EditPhoneNumber />);
});
