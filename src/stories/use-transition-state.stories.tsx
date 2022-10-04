import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import styled from '@emotion/styled';

import { useTransitionState } from '../use-transition-state';

const DURATION = 500;

const Component = styled.div({
  width: '3rem',
  height: '3rem',
  backgroundColor: 'green',
  transition: `background-color ${DURATION}ms linear`,
  '&:hover': {
    backgroundColor: 'yellow',
  },
});

export default {
  title: 'useTransitionState',
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = () => {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const transitionState = useTransitionState(hovered, DURATION);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const pointerenter = () => setHovered(true);
    const pointerleave = () => setHovered(false);

    el.addEventListener('pointerenter', pointerenter);
    el.addEventListener('pointerleave', pointerleave);

    return () => {
      el.removeEventListener('pointerenter', pointerenter);
      el.removeEventListener('pointerleave', pointerleave);
    };
  }, []);

  useMemo(() => console.log(transitionState), [transitionState]);

  return <Component ref={ref} />;
};

export const Basic = Template.bind({});
