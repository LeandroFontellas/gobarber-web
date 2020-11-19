import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...restProps }) => {
  // apesar da gente passar o type dps o eslint n gosta que a gente n passa
  // o type pro button entao a gente vai passar um type generico e
  // dps ele vai ser sobrescrito caso necessario pela props.
  return (
    <Container type="button" {...restProps}>
      {children}
    </Container>
  );
};

export default Button;
