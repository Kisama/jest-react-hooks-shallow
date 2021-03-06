import React from 'react';
import { shallow } from 'enzyme';
import UseEffectComponent from './use-effect-component';
import callback from './callback';
import cleanup from './cleanup';

jest.mock('./callback', () => jest.fn());
jest.mock('./cleanup', () => jest.fn())

describe('useEffect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('effect is called on first render and then on a button press', () => {
    const component = shallow(<UseEffectComponent />);

    expect(component.text()).toContain('false');
    component.find('button').simulate('click');
    expect(component.text()).toContain('true');
  });

  test('effect is mockable', () => {
    const component = shallow(<UseEffectComponent />);

    expect(component.text()).toContain('false');

    expect(callback).toHaveBeenCalledTimes(1);

    component.find('button').simulate('click');

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('cleanup function', () => {
    expect(cleanup).toHaveBeenCalledTimes(0);

    const component = shallow(<UseEffectComponent />);

    component.find('button').simulate('click');

    expect(cleanup).toHaveBeenCalledTimes(1);
  })
});
