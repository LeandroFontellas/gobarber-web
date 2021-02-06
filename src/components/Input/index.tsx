import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

// InputHTMLAttributes é tudo o que o input ja tem por padrao no html
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}
// quando vc coloca o inputprops entre setas ele a partir dai vai comecar a esperar esses
// parametros nesse componente
const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  containerStyle = {},
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  /* UseCallBack eh uma forma de criar uma funcao sem que ela fique sendo recriada na memoria toda vez que o navegador
  atualiza a pagina. É a forma mais correta de se criar uma função no react quando estamos usando RFC */
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    if (inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    // ou podemos fazer assim
    /* setIsFilled(!!input.current?.value) */
  }, []);
  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    // passando propriedade isfocused pro container pq eh ele que tem que estilizar
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {!!Icon && <Icon size={20} />}
      <input
        style={containerStyle}
        onBlur={handleInputBlur}
        onFocus={handleOnFocus}
        defaultValue={defaultValue}
        ref={inputRef}
        {...restProps}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
