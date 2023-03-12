import React from 'react';
import { shallow } from 'enzyme';
import PersonalInformation from './PersonalInformation';

it('renders without crashing', () => {
  shallow(<PersonalInformation />);
});
