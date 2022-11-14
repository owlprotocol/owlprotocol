import useBaseUrl from "@docusaurus/useBaseUrl";
import React from "react";
import Link from "@docusaurus/Link";
import {
    Box,
    Center,
    Container,
    SimpleGrid,
    Image,
    Text,
    Heading,
    useTheme,
} from "@chakra-ui/react";

type FeatureItem = {
    title: string;
    image: string;
    link: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: "Web3 Redux",
        link: "web3-redux",
        image: "/img/web3-redux-no-text.jpg",
        description: (
            <>
                A Redux library designed to efficiently sync and normalize
                blockchain data synced using web3.js and redux
            </>
        ),
    },
    {
        title: "Dynamic NFT Contracts",
        link: "contracts",
        image: "/img/dynamic.svg",
        description: (
            <>
                Owl Protocol is creating a set of open source smart contracts,
                standards, and APIs for creators and developers to easily create
                Dynamic NFTs
            </>
        ),
    },
];

function Feature({ title, image, description, link }: FeatureItem) {
    const { themes } = useTheme();

    return (
        <Box
            bg={themes.color3}
            boxShadow="lg"
            p={10}
            borderRadius={12}
            className="homepage-features"
            transition={".3s"}
            _hover={{
                transform: "scale(1.1)",
            }}
        >
            <Center boxSize={200} mx={"auto"} mb={10}>
                <Image alt={title} src={useBaseUrl(image)} borderRadius={12} />
            </Center>
            <Box textAlign={"center"} mx={"auto"} px={"10%"}>
                <Link href={link}>
                    <Heading size={"md"} mb={6}>
                        {title}
                    </Heading>
                </Link>
                <Text>{description}</Text>
            </Box>
        </Box>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <Box as="section" py={"10%"} className="features-section">
            <Container maxW={["100%", "65%"]}>
                <SimpleGrid
                    columns={[1, FeatureList.length]}
                    spacing={[10, 20]}
                >
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
