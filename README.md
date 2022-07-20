# KATENA
Operations on Blockchain with Tosca

This repo contains all the files needed to create setup and run the experiments used in the evaluation of KATENA:

- [Benchmark](./benchmark/): contains Service Template for app used in evaluation: dydx, dark forest, ens.

- [Examples](./examples/): files used to test the implementation. Contains basic uses cases to test relationships, library linkage, diamond pattern.

- [Nodes](./nodes/): contains:
    - smart contract ABIs used by xopera to deploy smart contracts (folders `contracts-*`)
    - Ansible playbooks attacched to xopera node and relationships types (folder `playbooks`)
    - Python scripts used to communicate with the chain (using Web3.py) (folder `scripts`)
    - all the node, relationships, capabilities, and relationships used to model the dApps (files `capabilities.yaml`, `contract.yaml`, `network.yaml`, `relationships.yaml`, `wallet.yaml`)


- [NoT-comparison](./not-comparison/) files used for the evaluation using the Number of Tokens (NoT) metric. See the dedicated [README file](./not-comparison/README.md)


- [Smart Contract Example](./smart-contract-example/): contains a truffle project used to test and use JS and TS capabilities to use functions of the bench apps

## Getting started

In order to start deploying apps using KATENA, we strongly recommend to start looking the files in [Examples](./examples/) and [Benchmark](./benchmark/) folders. 
KATENA can be used with a Python virtual environment on your local machine or with a Docker image.

### Local setup
In order to deploy those examples on a local network you will need:
- `python 3`
- [xopera orchestrator](https://github.com/xlab-si/xopera-opera#installation-and-quickstart)
- [ganache](https://trufflesuite.com/ganache/): this is required to bootstrap a blockchain hosted locally. You can either use this or another Ethereum-compatible client (e.g., [geth](https://geth.ethereum.org/)).

Do the following steps:
- run a Ganache instance `i.e. ganache-cli` (See [benchmarks](#bench-applications) for choosing the parameters)
- Install the required packages with `pip` (file located [here](./nodes/scripts/requirements.txt))
- Move the YAML file containing the application description to the project root (e.g., `cp ./bench/ens.yaml .`)
- Change the `contracts-*` directory name to `contracts` (e.g. `mv ./nodes/contracts-dydx ./nodes/contracts`). This is due to the fact that the Ansible playbooks are configure in order to read from the `contracts` folder
- Create the `input.yml` file (use `input.example.yaml` and paste your wallet address and private key. Ganache will prompt them in the terminal when you start it)
- Deploy with `xopera` (i.e. `opera deploy -i input.yml ens.yaml`)

### Docker image
In order to use the Docker image build the Dockerfile first and run the container, then:

- open one terminal (i.e., `docker exec <container_id> /bin/bash`) and create a ganache instance `npx ganache-cli` with additional parameters (see section below). This is due to the fact that wallet credentials are print when you start ganache.


All these other steps are done in a different terminal:
- Install the required packages with `pip` (file located [here](./nodes/scripts/requirements.txt))
- Move the YAML file containing the application description to the project root (e.g., `cp ./bench/ens.yaml .`)
- Change the `contracts-*` directory name to `contracts` (e.g. `mv ./nodes/contracts-dydx ./nodes/contracts`). This is due to the fact that the Ansible playbooks are configure in order to read from the `contracts` folder
- Create the `input.yml` file (use `input.example.yaml` and paste your wallet address and private key. Ganache will prompt them in the terminal when you start it)
- Deploy with `xopera` (i.e. `opera deploy -i input.yml ens.yaml`)

## Bench applications
- Ethreum Name Servie (ENS): a DNS working on ethereum
- dydx: DeFi application
- Dark Forest: on chain game that uses the Diamond pattern. 


**PAY ATTENTION**: if you want to deploy Dark Forest smart contracts you will probably need to disable the smart contract size constraint and increase the gas limit (i.e. start local network with these parameters `ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize`) because some contracts are quite large. If this doesn't work try to check if you are running out of gas and increase the allowed gas per transaction.

## Reproduce the experiments
- To automatically deploy the three applications use the [deploy-bench.sh](./deploy-bench.sh) script. To run it you should have a running instance of Ganache and the credentials stored in `input.yml` file. All the other instructions are already automated by the script.
- To run the Number of tokens evaluation see the [README](./not-comparison/README.md) file in the dedicated folder.