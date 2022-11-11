import { Button } from '@chakra-ui/react';

const ChakraButton = ({ variant, disabled }: any) => (
    <Button variant={variant} disabled={disabled}>
        Hello OWL
    </Button>
);

export default ChakraButton;
