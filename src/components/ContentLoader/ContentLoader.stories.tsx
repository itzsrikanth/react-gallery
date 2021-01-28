import * as React from 'react';
import { Story } from '@storybook/react/types-6-0';
import ContentLoader, {ContentLoaderProps} from './ContentLoader';

const props: ContentLoaderProps = {
  width: 500,
  height: 500
}

const story = {
  title: 'ContentLoader',
  component: ContentLoader
};
export default story;

const Template: Story<ContentLoaderProps> = (args) => <ContentLoader {...args} />;

export const ImgAnimatedHolder = Template.bind({});
ImgAnimatedHolder.args = {...props};
