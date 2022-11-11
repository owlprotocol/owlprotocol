import { Textarea } from '@chakra-ui/react';

const ChakraTextarea = ({ variant, disabled, value }: any) => (
    <Textarea variant={variant} disabled={disabled} value={value} placeholder={'placeholder text'} />
);

export default ChakraTextarea;
