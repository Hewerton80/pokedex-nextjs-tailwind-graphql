import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '.'
// import { Button } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/forms/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
    <Button {...args} />
    <Button {...args} disabled>
      disabled
    </Button>
    <Button {...args} isLoading />
  </div>
)
// const Template2: ComponentStory<typeof Button> = (args) => (
//   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//     <Button {...args} disabled>
//       teste etste
//     </Button>
//   </div>
// )

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Primary.args = {
  variant: 'primary',
  children: 'primary',
}

export const Secondary = Template.bind({})

Secondary.args = {
  variant: 'secondary',
  children: 'secondary',
}

export const Success = Template.bind({})

Success.args = {
  variant: 'success',
  children: 'success',
}

export const Warning = Template.bind({})

Warning.args = {
  variant: 'warning',
  children: 'warning',
}

export const Info = Template.bind({})

Info.args = {
  variant: 'info',
  children: 'info',
}

export const Danger = Template.bind({})

Danger.args = {
  variant: 'danger',
  children: 'danger',
}

export const Light = Template.bind({})

Light.args = {
  variant: 'light',
  children: 'light',
}

export const Dark = Template.bind({})

Dark.args = {
  variant: 'dark',
  children: 'dark',
}

export const ClickExample = () => {
  const [count, setCount] = useState(0)

  return <Button onClick={() => setCount(count + 1)}>click to increment: {count}</Button>
}
