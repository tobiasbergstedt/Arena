import React from 'react';
import { shallow } from 'enzyme';
import ScrollContainer from './ScrollContainer';

it('renders without crashing', () => {
  shallow(<ScrollContainer />);
});
