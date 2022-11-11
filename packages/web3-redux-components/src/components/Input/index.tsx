import { Input } from '@chakra-ui/react';

const ChakraInput = ({ variant, disabled, value }: any) => (
    <Input variant={variant} disabled={disabled} value={value} placeholder={'placeholder text'} />
);

export default ChakraInput;
