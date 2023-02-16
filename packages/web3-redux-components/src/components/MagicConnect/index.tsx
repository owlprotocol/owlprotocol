import {
    Badge,
    Box,
    Button,
    Center,
    Image,
    Select,
    Spinner,
    VStack,
    useTheme,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    useMagicConnect,
    updateAccountInStore,
    updateNetworkIdInStore,
} from "./helpers";
import MagicIcon from "./assets/magic-icon.png";

interface Props {
    defaultNetworkIdx: number;
}

const MagicConnect = ({ defaultNetworkIdx = 0 }: Props) => {
    const dispatch = useDispatch();
    const { web3, magic, Config } = useMagicConnect();
    const { web3Ethereum, web3Polygon, web3Optimism } = web3;
    const { magicEthereum, magicPolygon, magicOptimism } = magic;

    const networks = {
        1: {
            networkId: 1,
            name: "Ethereum",
            symbol: "ETH",
            web3: web3Ethereum,
            magic: magicEthereum,
        },
        137: {
            networkId: 137,
            name: "Polygon",
            symbol: "MATIC",
            web3: web3Polygon,
            magic: magicPolygon,
        },
        10: {
            networkId: 10,
            name: "Optimism",
            symbol: "OP",
            web3: web3Optimism,
            magic: magicOptimism,
        },
    };

    const [config] = Config.hooks.useConfig();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<string | null>(null);
    const [walletType, setWalletType] = useState<string | null>(null);
    const [currentNetwork, setCurrentNetwork] = useState<any>(
        networks[defaultNetworkIdx]
    );
    const [balance, setBalance] = useState<string | number | null>(null);

    useEffect(() => connectMagic(), [currentNetwork]);
    useEffect(() => fetchBalance(), [currentNetwork, account]);

    useEffect(() => {
        const f = async () => {
            const { walletType } =
                await currentNetwork.magic.connect.getWalletInfo();
            setWalletType(walletType);
        };

        f();
    }, [account]);

    // Updates store with new account
    useEffect(() => {
        account && updateAccountInStore({ config, dispatch, account });
    }, [account]);

    // Updates store with new networkId
    useEffect(() => {
        currentNetwork &&
            updateNetworkIdInStore({
                config,
                dispatch,
                networkId: currentNetwork.networkId,
            });
    }, [currentNetwork]);

    const connectMagic = () => {
        currentNetwork &&
            currentNetwork.web3 &&
            currentNetwork.web3.eth
                .getAccounts()
                .then((accounts: string[]) => {
                    if (accounts.length !== 0) {
                        const account = accounts?.[0];
                        setAccount(account);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                })
                .catch((error: string) => {
                    console.log(error);
                });
    };

    const fetchBalance = () => {
        if (!account) return;

        currentNetwork &&
            currentNetwork.web3 &&
            currentNetwork.web3.eth.getBalance(account).then((bal: any) => {
                setBalance(currentNetwork.web3.utils.fromWei(bal));
            });
    };

    const showWallet = () => {
        currentNetwork.magic.connect.showWallet().catch((e: string) => {
            console.log(e);
        });
    };

    const handleChangeNetwork = ({ target }: any) => {
        const chainId: number = target.value;
        setCurrentNetwork(networks[chainId]);
    };

    const disconnect = async () => {
        await currentNetwork.magic.connect.disconnect().catch((e: string) => {
            console.log(e);
        });

        setAccount(null);
        setWalletType(null);
        setBalance(null);
    };

    const { themes } = useTheme();

    return (
        <Box
            bg={themes.color5}
            p={4}
            borderRadius={12}
            pos={"relative"}
            overflow={"hidden"}
        >
            {isLoading && (
                <Box
                    pos={"absolute"}
                    zIndex={100}
                    w={"100%"}
                    h={"100%"}
                    left={0}
                    top={0}
                    bg={themes.color6}
                >
                    <Center w={"100%"} h={"100%"}>
                        <Spinner />
                    </Center>
                </Box>
            )}
            <VStack gap={6}>
                <VStack>
                    <Select
                        name="network"
                        onChange={(e) => handleChangeNetwork(e)}
                        variant="hollow"
                    >
                        <option value="1">Ethereum</option>
                        <option value="137">Matic</option>
                        <option value="10">Optimism</option>
                    </Select>
                    {walletType && (
                        <Badge p={2} bg={themes.color9}>
                            Wallet Type: {walletType}
                        </Badge>
                    )}
                    <Badge
                        p={1}
                        textTransform={"none"}
                        onClick={!account ? connectMagic : null}
                        cursor={"pointer"}
                    >
                        {account || "Not Connected"}
                    </Badge>
                    {balance && (
                        <Box>
                            Balance: {balance || 0}
                            &nbsp;{currentNetwork.symbol}
                        </Box>
                    )}
                </VStack>
                {account && (
                    <VStack gap={2}>
                        {walletType !== "metamask" && (
                            <Button
                                onClick={showWallet}
                                variant="form"
                                bg={"#6851FF"}
                                leftIcon={
                                    <Image
                                        boxSize={"30px"}
                                        src={MagicIcon}
                                        alt={"Magic Connect Icon"}
                                    />
                                }
                            >
                                Show Magic Wallet
                            </Button>
                        )}
                        <Button onClick={disconnect} variant="cancel">
                            Disconnect
                        </Button>
                    </VStack>
                )}
            </VStack>
        </Box>
    );
};

export default MagicConnect;
