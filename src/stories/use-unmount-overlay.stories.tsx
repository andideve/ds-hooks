import React, { useCallback, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import styled from '@emotion/styled';

import useUnmountOverlay from '../use-unmount-overlay';

const DURATION = 500;

const Component = styled.div({
  opacity: 0,
  transition: `opacity ${DURATION}ms linear`,
  '&.expand': {
    opacity: 1,
  },
});

export default {
  title: 'useUnmountOverlay',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shouldUnmount = useUnmountOverlay(isOpen, DURATION);

  const onToggle = useCallback(() => {
    setIsOpen((s) => !s);
  }, []);

  return (
    <div>
      <button type="button" onClick={onToggle}>
        Toggle
      </button>
      <Component className={isOpen ? 'expand' : undefined}>
        {!shouldUnmount && (
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, reiciendis!</p>
        )}
      </Component>
    </div>
  );
};

export const Basic = Template.bind({});
