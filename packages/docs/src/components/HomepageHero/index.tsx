import React from "react";
import { Box, Center, Heading, Image, useTheme } from "@chakra-ui/react";
import useBaseUrl from "@docusaurus/useBaseUrl";

function HomepageHero() {
    const { themes } = useTheme();

    return (
        <Box as="header">
            <Center
                textAlign={"center"}
                h={"60vh"}
                className="homepage-hero"
            >
                <Box>
                    <Image
                        w={150}
                        mx={"auto"}
                        mb={4}
                        alt={"Owl Protocol"}
                        src={useBaseUrl("/img/owl_banner.svg")}
                    />
                    <Heading as="h1" size={"2xl"} mb={4} color={'white'} fontWeight={600}>
                        Owl Protocol
                    </Heading>
                    <Heading as="h2" size={"lg"} fontWeight={200}>
                        No-Code, <span style={{"fontWeight": 400}}>Dynamic NFT</span> Workshop
                    </Heading>
                </Box>
            </Center>
        </Box>
    );
}

export default HomepageHero;
