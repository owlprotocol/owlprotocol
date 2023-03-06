import { Box, Button, useTheme } from '@chakra-ui/react';
import { AssetPicker, Asset } from '@owlprotocol/web3-redux'
import { ReactComponent as XIcon } from './assets/x-icon.svg';
import Icon from '../Icon';
//import { ERC721Instance } from '../ERC721/ERC721Instance';
//import { ERC721InstanceGridModal } from '../ERC721/ERC721InstanceGridModal';

export interface AssetPickerProps {
    id: string
    choices: Asset[];
}

export const AssetPickerModal = ({ id, choices }: AssetPickerProps) => {
    const { themes } = useTheme();

    const { selected, picker, setSelected, toggleSelected } = AssetPicker.hooks.useAssetPicker(id, choices)
    const selecting = picker?.status === 'SELECTING';


    if (picker?.status === 'SELECTED') {
        if (selected.length > 0) {
            return <>
                {
                    selected.map((a) => {
                        if (a.type === 'ERC721') {
                            <Box my={4}>
                                <Button
                                    float={'right'}
                                    bg={'transparent'}
                                    boxSize={'28px'}
                                    p={0}
                                    mt={1}
                                    onClick={() => setSelected([])}
                                >
                                    <XIcon />
                                </Button>
                                {
                                    //<ERC721Instance networkId={a.networkId} address={a.address} tokenId={a.tokenId} />
                                }
                                <Button onClick={() => toggleSelected()} variant={'link'}>
                                    Replace
                                </Button>
                            </Box>
                        }
                    })
                }
            </>
        } else {
            return (
                <Box
                    onClick={() => toggleSelected()}
                    w={'138px'}
                    h={'138px'}
                    bg={themes.color5}
                    //@ts-expect-error
                    justify={'center'}
                    align={'center'}
                    my={4}
                    p={2}
                    mx={'auto'}
                    borderRadius={12}
                    cursor={'pointer'}
                >
                    <Box mb={2} bg={themes.color6} borderRadius={12} py={6}>
                        <Icon icon="AddRounded" size={40} />
                    </Box>
                    <Box
                        border={'2px solid'}
                        borderColor={themes.color6}
                        borderRadius={12}
                        textAlign={'center'}
                        fontWeight={400}
                        fontSize={10}
                        p={1}
                    >
                        Select Item
                    </Box>
                </Box>
            );
        }
    } else {
        return (
            <>{
                //<ERC721InstanceGridModal isOpen={true} tokens={choices as any[]} onClick={setSelected} />
            }
            </>
        );
    }
};
