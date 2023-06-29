import { styled } from 'styled-components';
import { useLiveDemoContext } from '../LiveDemoContext';

const StyleAlertContainer = styled.div`
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.01071em;
  background-color: #d32f2f;
  display: flex;
  padding: 6px 16px;
  color: #fff;
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 10px;
`;

export const DemoError = () => {
  const { demo } = useLiveDemoContext();
  if (!demo.error) {
    return null;
  }

  return (
    <StyleAlertContainer>
      {demo.error}
    </StyleAlertContainer>
  );
};
