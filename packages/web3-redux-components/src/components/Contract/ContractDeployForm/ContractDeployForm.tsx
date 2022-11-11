import { Box } from '@chakra-ui/react';
import { AbiItemInput } from '../../ContractAbiForm/AbiItemInput/index.js';

export interface ContractDeployFormProps {
    networkId: string | undefined;
    inputs: {
        name: string | undefined;
        type: string;
    }[];
}

export const ContractDeployForm = ({ inputs }: ContractDeployFormProps) => {
    const onChange = (value: any, error: Error | undefined, key: number) => console.debug({ value, error, key });

    return (
        <>
            {inputs.map(({ name, type }: any, key: number) => {
                return (
                    <Box mb={3} key={key}>
                        <AbiItemInput
                            type={type}
                            name={name}
                            onChange={(value, error) => {
                                onChange(value, error, key);
                            }}
                        />
                    </Box>
                );
            })}
        </>
    );
};
