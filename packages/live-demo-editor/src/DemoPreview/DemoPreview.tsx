import { useEffect } from 'react';
import { useRunner } from 'react-runner';
import { styled } from 'styled-components';
import { useLiveDemoContext } from '../LiveDemoContext';

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;
  padding: 24px;
`;

/**
 * Removes leading spaces (indentation) present in the `.tsx` previews
 * to be able to replace the existing code with the incoming dynamic code
 * @param {string} input
 */
function trimLeadingSpaces(input = '') {
  return input.replace(/^\s+/gm, '');
}

export const DemoPreview = () => {
  const { demo, events, flags } = useLiveDemoContext();
  const { element, error } = useRunner({
    code: flags.isPreview ?
      trimLeadingSpaces(demo.sourceCode).replace(
        trimLeadingSpaces(demo.previewCode),
        demo.editorCode
      ) :
      demo.editorCode,
    scope: demo.scope
  });
  
  useEffect(() => {
    events.onErrorStateChange?.(error);
  }, [error, events.onErrorStateChange]);
  
  return (
    <StyledPreview>
      {element}
    </StyledPreview>
  );
};
