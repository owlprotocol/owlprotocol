/* eslint-disable */
import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
    title: string;
    image: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Dynamic NFTs',
        image: '/img/feature-equipment-v3.png',
        description: (
            <>
                Launch NFTs that integrate with powerful features like combining, crafting, breeding, and real-world data oracles.
            </>
        ),
    },
    {
        title: 'Vertically Integrated',
        image: '/img/vulcanlink-logo_stacked-white-sm.png',
        description: (
            <>
                Built on our internal Web3 infrastructure by Vulcan Link, a Top 25 Chainlink Node Operator.
            </>
        ),
    },
    {
        title: 'Web3 Redux',
        image: '/img/web3_redux.png',
        description: (
            <>
                A Web3 SDK state management library built for the <strong>multi-chain</strong> age using <a href="https://github.com/web3/web3.js">web3.js</a>,&nbsp;
                <a href="https://github.com/reduxjs/redux">Redux</a>, and <a href="https://github.com/dexie/Dexie.js">Dexie.js</a>.
            </>
        ),
    },
];

function Feature({ title, image, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img className={styles.featureSvg} alt={title} src={useBaseUrl(image)} />
            </div>
            <div className="text--center padding-horiz--md">
                <h1 style={{color: 'var(--ifm-color-primary)'}}>{title}</h1>
                <p style={{color: 'var(--ifm-color-white)'}}>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
