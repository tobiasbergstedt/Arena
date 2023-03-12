import React from 'react';
import { shallow } from 'enzyme';
import ProtectedRoute from './ProtectedRoute';

it('renders without crashing', () => {
  shallow(<ProtectedRoute />);
});
