---
sidebar_position: 1
slug: '/features'
---

import { SimpleGrid } from '@chakra-ui/react'

# Index

The primary features supported by Owl Protocol are:

<SimpleGrid className="features-grid" columns={{sm: 1, md: 2}} spacing={16}>
    <Box>
        <a href="/contracts/features/dynamic_nfts">
            <div className="cell-bg">
                <img src="/img/feature-dnft-v3.png"/>
                <br/>
                <strong>Dynamic NFTs</strong>
                <p>NFTs that change over time, or when triggered by real-world/external data.</p>
            </div>
        </a>
    </Box>
    <Box>
        <a href="/contracts/features/attaching">
            <div className="cell-bg">
                <img src="/img/feature-equipment-v3.png"/>
                <br/>
                <strong>Attaching / Equipment</strong>
                <p>Map attachable NFTs to upgrade or change certain traits or stats.</p>
            </div>
        </a>
    </Box>
    <Box>
        <a href="/contracts/features/crafting">
            <div className="cell-bg">
                <img src="/img/feature-combining-v3.png"/>
                <br/>
                <strong>Combining / Crafting / Breeding</strong>
                <p>Input or whitelist NFTs that will output certain NFTs, <i>sometimes carrying over traits</i>.</p>
            </div>
        </a>
    </Box>
    <Box>
        <a href="/contracts/features/crosschain">
            <div className="cell-bg">
                <img src="/img/feature-crosschain-v3.png"/>
                <br/>
                <strong>Cross Collection Interactions</strong>
                <p>Create mechanics between multiple collections, including those you <strong>DO NOT</strong> own.</p>
            </div>
        </a>
    </Box>
</SimpleGrid>
