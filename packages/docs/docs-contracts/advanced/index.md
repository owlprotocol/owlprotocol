---
sidebar_position: 1
slug: '/advanced'
---

# Overview

### Deployment

Use our [CLI Tool](/contracts/getting-started/cli)'s command `deployCommon` to deploy the base smart contracts, beacons, and proxies.

### Architecture

We use a somewhat complicated system of interlaced proxies in order to optimize for low-gas deployments and easily-upgradeable contracts. This comes at the cost of a small uptick in gas used per transaction.

See [OWLArchitecture](https://github.com/owlprotocol/contracts/blob/master/OWLArchitecture.svg) for more info on what's going on under the hood.
