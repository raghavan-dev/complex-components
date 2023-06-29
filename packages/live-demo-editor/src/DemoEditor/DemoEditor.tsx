import * as prism from 'prismjs';
import Editor from 'react-simple-code-editor';
import { styled } from 'styled-components';
import { useLiveDemoContext } from '../LiveDemoContext';

import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-okaidia.css';

const ScrollContainer = styled.div`
  max-height: min(100%, 1000px);
  overflow: auto;
  background-color: #27212e;
  border-radius: 20px;
  color-scheme: dark;
  position: relative;
`;
const StyledEditor = styled(Editor)`
  font-family: Menlo, Consolas, "Droid Sans Mono", monospace;
  font-weight: 400;
  color: #f8f8f2;
  min-width: 100%;
`;

export const DemoEditor = () => {
  const { demo, events } = useLiveDemoContext();
  return (
    <ScrollContainer>
      {
        // @ts-ignore-next-line
        <StyledEditor
          value={demo.editorCode}
          onValueChange={events.onCodeChange}
          highlight={code => prism.highlight(code, (prism.languages as prism.LanguageMap)[demo.language], demo.language)}
          padding={20}
        />
      }
    </ScrollContainer>
  );
};
