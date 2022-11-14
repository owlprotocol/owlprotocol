/* eslint-disable */
import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HomepageHero from "../components/HomepageHero";

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={siteConfig.title}
            description="Description will go into a meta tag in <head />"
        >
            <HomepageHero />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    );
}
