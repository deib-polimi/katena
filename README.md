# tosca-chain
Operations on Blockchain with Tosca

This repo contains all the files needed to create Toscachain:

- [Benchmark](./benchmark/): contains Service Template for app used in evaluation: dydx, dark forest, ens.

- [Development](./development/): contains scripts and Dockerfiles to bootstrap a working dev environment. It contains:
    a. xopera: xopera orchestrator files
    b. gmt: Graphical modelling tool (not working ATM)

- [Examples](./examples/): files used to test the implementation. Contains basic uses cases to test relationships, library linkage, diamond

- [Nodes](./nodes/): contains:
    a. smart contract ABIs used by xopera to deploy smart contracts
    b. Ansible playbooks attacched to xopera node and relationships types
    c. scripts where the library Web3py is used to communicate with the chain
    d. all the node, relationships, capabilities, and relationships used to model the dApps


- [Smart Contract Example](./smart-contract-example/): contains a truffle project used to test and use JS and TS capabilities to use functions of the bench apps

## Getting started

In order to start using the elements in this repo, we strongly recommend to start looking the files in [Examples](./examples/) and [Benchmark](./benchmark/) folders. In order to deploy those examples on a local network you will need:
- `ganache`
- `python 3`

Do the following steps:
- Install the required packages with `pip` (file located [here](./nodes/scripts/requirements.txt))
- Move the YAML file containing the `ServiceTemplate` to the project root (e.g., `cp ./bench/ens.yaml .`)
- Change the `contracts-*` directory name to `contracts` (e.g. `mv ./nodes/contracts-dydx ./nodes/contracts`). This is due to the fact that the Ansible playbooks are configure in order to read from the `contracts` folder
- Create the `input.yaml` file (use `input.example.yaml` and paste your wallet address and private key)
- Deploy with `xopera` (i.e. `opera deploy -i input.yaml ens.yaml)

## Bench
- Ethreum Name Servie (ENS): a DNS working on ethereum
- dydx: One of the most famous DeFi application
- Dark Forest: on chain game that uses the Diamond pattern. **PAY ATTENTION**: if you want to deploy these smart contracts you will probably need to disable the smart contract size constraint (i.e. start local network with `ganache-cli --allowUnlimitedContractSize`) because some contracts are quite large. If this doesn't work try to check if you are running out of gas and increase the allowed gas per transaction