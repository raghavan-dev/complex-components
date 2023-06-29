import { ReactElement } from 'react';
import { styled } from 'styled-components';

const RoundButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  padding: 5px;
  background-color: transparent;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

type Props = {
  children: ReactElement | string;
  title?: string;
  onClick?: () => void;
};
export const ToolbarButton = ({
  children,
  title,
  onClick
}: Props) => {
  return <RoundButton onClick={onClick} title={title} aria-label={title}>{children}</RoundButton>
};
