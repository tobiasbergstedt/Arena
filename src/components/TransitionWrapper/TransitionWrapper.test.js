import React from 'react';
import { shallow } from 'enzyme';
import TransitionWrapper from './TransitionWrapper';

it('renders without crashing', () => {
  shallow(<TransitionWrapper />);
});
