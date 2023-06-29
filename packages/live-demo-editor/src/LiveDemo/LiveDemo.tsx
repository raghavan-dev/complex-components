import { useEffect, useReducer, useState } from 'react';
import { Scope } from 'react-runner';
import { styled } from 'styled-components';
import { DemoEditor } from '../DemoEditor';
import { DemoError } from '../DemoError';
import { DemoPreview } from '../DemoPreview';
import { DemoToolbar } from '../DemoToolbar';
import { LiveDemoContext, LiveDemoContextProps } from '../LiveDemoContext/LiveDemoContext';
import { useDebouncedState } from '../hooks/useDebouncedState';

const StyledDemoContainer = styled.div<{ width?: string, height?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: ${({ height }) => height ?? 'initial' };
  width: ${({ width }) => width ?? 'initial' };
`;
const StyledPreviewContainer = styled.div`
  border-radius: 10px;
  border: #ececec 1px solid;
  overflow: clip;
  flex-shrink: 0;
`;
const StyledEditorContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

type Props = {
  /**
   * The full raw code for the demo.
   */
  sourceCode: string;

  /**
   * The highlight code for the demo.
   */
  previewCode: string;

  /**
   * The globals and imports for the demo.
   */
  scope: Scope;

  /**
   * The language of the demo code.
   */
  language: 'jsx' | 'tsx';
  
  /**
   * Width of the demo.
   */
  width?: string;
  
  /**
   * Height of the demo.
   */
  height?: string;
};

export const LiveDemo = ({
  height,
  language,
  previewCode,
  scope,
  sourceCode,
  width
}: Props) => {
  const [demoKey, setDemoKey] = useReducer((key) => key + 1, 0);
  const [ isPreview, setIsPreview ] = useState(true);
  const [ editorCode, setEditorCode ] = useState(previewCode);
  const [ error, setError ] = useDebouncedState<string | null>(null, 300);
  const context: LiveDemoContextProps = {
    demo: {
      editorCode,
      error,
      language,
      previewCode,
      scope,
      sourceCode
    },
    events: {
      onCodeChange: (code) => setEditorCode(code),
      onCodePreviewToggleClick: () => setIsPreview((isPreview) => !isPreview),
      onCopySourceCodeClick: () => navigator.clipboard.writeText(editorCode),
      onErrorStateChange: (error) => setError(error),
      onResetDemoClick: () => {
        setEditorCode(isPreview ? previewCode : sourceCode);
        setDemoKey();
      },
    },
    flags: {
      isPreview
    }
  };

  useEffect(() => {
    setEditorCode(isPreview ? previewCode : sourceCode);
  }, [ isPreview, previewCode, sourceCode ]);

  return (
    <LiveDemoContext.Provider value={context}>
      <StyledDemoContainer width={width} height={height}>
        <StyledPreviewContainer>
          <DemoPreview key={demoKey} />
          <DemoToolbar />
        </StyledPreviewContainer>
        <StyledEditorContainer>
          <DemoEditor />
          <DemoError />
        </StyledEditorContainer>
      </StyledDemoContainer>
    </LiveDemoContext.Provider>
  );
};
