import { StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import * as StyledComponents from 'styled-components';
import { LiveDemo } from '../LiveDemo';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Components/LiveDemo',
  component: LiveDemo,
  tags: ['autodocs']
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: StoryObj<ComponentProps<typeof LiveDemo>> = {
  argTypes: {
    scope: {
      options: ['styled-components'],
      mapping: {
        'styled-components': {
          import: {
            'styled-components': StyledComponents
          }
        }
      }
    }
  },
  args: {
    sourceCode: ` 
  import { styled, css } from 'styled-components';
  
  const StyledButton = styled.button\`
    background: transparent;
    color: steelblue;
    border: 2px solid steelblue;
    margin: 5px 10px;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 4px;

    \${props => props.primary && css\`
      background: steelblue;
      color: white;
    \`}
  \`
  
  export default function ButtonDemo() {
    return (
      <>
        <StyledButton>Normal Button</StyledButton>
        <StyledButton primary>Primary Button</StyledButton>
      </>
    );
  }
    `,
    previewCode: `
<>
  <StyledButton>Normal Button</StyledButton>
  <StyledButton primary>Primary Button</StyledButton>
</>
    `,
    // @ts-ignore
    scope: 'styled-components',
    language: 'jsx',
    width: '800px',
    height: '500px'
  },
};
