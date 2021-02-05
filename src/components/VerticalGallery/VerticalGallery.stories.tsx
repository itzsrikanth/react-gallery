import * as React from 'react';
import { Story } from '@storybook/react/types-6-0';
import faker from 'faker';
import VerticalGallery, { VerticalGalleryProps } from './VerticalGallery';

import img1 from './bg.jpg';
import img2 from './bg2.jpg';
import img3 from './bg3.jpg';

const story = {
  title: 'VerticalGallery',
  component: VerticalGallery
};

export default story;

const Template: Story<VerticalGalleryProps> = (args) => <VerticalGallery {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  classNames: [],
  popFromBehind: faker.lorem.words(),
  caption: faker.lorem.words(3),
  fg: [
    img1, img2, img1, img3
  ]
};
