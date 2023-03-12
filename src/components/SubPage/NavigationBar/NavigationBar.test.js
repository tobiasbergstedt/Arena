import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from './NavigationBar';

it('renders without crashing', () => {
  shallow(<NavigationBar />);
});
