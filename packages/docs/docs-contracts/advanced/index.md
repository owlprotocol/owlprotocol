---
sidebar_position: 8
slug: '/advanced'
---

# Advanced

### Deployment

In [deploy](https://github.com/owlprotocol/contracts/tree/master/packages/owlprotocol-contracts/deploy/001_Implementation), run `ProxyFactory.ts` script. Take the address outputted and place it in variable `ProxyFactoryAddress` in `CrafterTransfer.ts`

### Architecture

We use a somewhat complicated system of interlaced proxies in order to optimize for low-gas deployments and easily-upgradeable contracts. This comes at the cost of a small uptick in gas used per transaction.

See [OWLArchitecture](https://github.com/owlprotocol/contracts/blob/master/OWLArchitecture.svg) for more info on what's going on under the hood.
