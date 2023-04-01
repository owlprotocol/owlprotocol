import { Box, Heading, Text } from '@chakra-ui/react';
export const ErrorComponent = () => {
    return (<Box textAlign={'center'} p={4}>
        <Heading>
            Oops.. <br />
        </Heading>
        <Text>
            <br /> Something went wrong. please try again
        </Text>
    </Box>)
};

