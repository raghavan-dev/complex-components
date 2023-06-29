import { styled } from 'styled-components';
import { useLiveDemoContext } from '../LiveDemoContext';
import { CodeIcon } from './CodeIcon';
import { CopyIcon } from './CopyIcon';
import { ResetIcon } from './ResetIcon';
import { ToolbarButton } from './ToolbarButton';

const StyledToolbar = styled.div`
  display: flex;
  background: #f6f6f6;
  padding: 6px;
  justify-content: flex-end;
  gap: 4px;
`;

export const DemoToolbar = () => {
  const { events, flags } = useLiveDemoContext();
  return (
    <StyledToolbar>      
      <ToolbarButton title={flags.isPreview ? 'Show full code' : 'Hide full code'} onClick={events.onCodePreviewToggleClick}>
        <CodeIcon />
      </ToolbarButton>

      <ToolbarButton title="Copy the source code" onClick={events.onCopySourceCodeClick}>
        <CopyIcon />
      </ToolbarButton>
      
      <ToolbarButton title="Reset the demo" onClick={events.onResetDemoClick}>
        <ResetIcon />
      </ToolbarButton>
    </StyledToolbar>
  )
};
