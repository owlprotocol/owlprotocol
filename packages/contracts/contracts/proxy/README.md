Contracts for implementation of Beacon-Proxy infrastructure for upgradeable contract deployment. See [a relative link](../../../../OWLArchitecture.drawio)

### 3 Deployment Strategies
* Static Regular: Regular deployment that triggers initializer
* ERC1167 Minimal Proxy: Transparent proxy that DELEGATECALL to implementation (cheaper deployment, transactional overhead due DELEGATECALL)
* BeaconProxy: Transparent proxy that DELEGATECALL to beacon (upgradeable if beacon, transactional overhead due to SLOAD address + CALL to beacon + DELEGATECALL to implementation)

A 4th possible possible solution is to deploy a minimal proxy to a the beacon proxy implementation though this adds additional overhead & complexity.
