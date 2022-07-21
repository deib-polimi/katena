# KATENA
Operations on Blockchain with TOSCA.

This repo contains all the files needed to setup and run the experiments used in the evaluation of KATENA.

## Experiments reproducibility
What should be reproduced in this repo:
- **Benchmark application deployment**: deploy the three applications analyzed in the paper on Ganache. To reproduce the experiments, we recommend using the Docker setup with the [deploy-bench.sh](./deploy-bench.sh) script that automates the deployment of the benchmark applications. See [here](#docker-setup).
- **Numer of tokens analysis**: run the scripts to compare the difference in Number of Tokens between KATENA specification files used to deploy the applications and the original deployment scripts. See [here](#compute-number-of-tokens).

## Getting started
In order to start deploying apps using KATENA, we strongly recommend looking at the files in [Examples](./examples/) and [Benchmark](./benchmark/) folders. 
KATENA can be used with a Python virtual environment on your local machine or with a [Docker](https://www.docker.com/) image.

### Docker setup

The steps are the following:
- build the docker image (`docker build -t katena .`) and run the container (`docker run -it katena`).
- open one terminal (i.e., `docker exec -it <container_id> /bin/bash`, retrieve `<container_id>` with `docker ps`) and create a ganache instance `npx ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize` (see [benchmarks](#benchmark-applications) section to understand why we choose those parameters). It will prompt a set of accounts and private keys to use in the next steps.
- open a different terminal and create the `input.yml` file that stores your wallet credentials. Use `input.example.yaml` as an example and paste your wallet address and private key in the newly created `input.yml`. Ganache will prompt that information as shown in the figure below. Choose the account you prefer and the corresponding private key and put them in the `UserWallet` and `UserKeyGanache` respectively.

![](./images/ganache-accounts.jpg)

- run the [deploy-bench.sh](./deploy-bench.sh) script to automatically deploy the three benchmark applications. In case of errors, the script generates a log stored in the file `deploy.log`. It takes 10 minutes to complete the entire procedure.
This script automates the following operations (that you should do manually if you are using KATENA to deploy your personal dApp):
    - Move the YAML file containing the application description to the project root (e.g., `cp ./benchmark/ens.yaml .`)
    - The smart contract ABIs of your application must be put in a folder named `contracts` in `nodes` directory. The ABIs of the benchmark applications are in the folders `./nodes/contracts-<APP_NAME>`.
    - Deploy with `xopera` (e.g., `opera deploy -i input.yml ens.yaml`)

### Local setup
To use KATENA on your local machine you need:
- We tested our prototype on Ubuntu 20.04.4
- `python 3.8`
- `pip`
- [xopera orchestrator](https://github.com/xlab-si/xopera-opera#installation-and-quickstart)
- [ganache](https://trufflesuite.com/ganache/): this is required to bootstrap a blockchain hosted locally. You can either use this or another Ethereum-compatible client (e.g., [geth](https://geth.ethereum.org/)).

Do the following steps:
- Run a Ganache instance with the command `ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize` (see [benchmarks](#benchmark-applications) section to understand why we choose those parameters). It will prompt a set of accounts and private keys to use in the next step.
- Create the `input.yml` file that stores your wallet credentials. Use `input.example.yaml` as an example and paste your wallet address and private key in the newly created `input.yml`. Ganache will prompt that information as shown in the figure below. Choose the account you prefer from `Available accounts` and the corresponding private key from `Private keys` and put them in the `UserWallet` and `UserKeyGanache` respectively.


![](./images/ganache-accounts.jpg) 


- Install the required packages with `pip` (file located [here](./requirements.txt)) (`pip install -r requirements.txt`)
- Move the YAML file containing the application description to the project root (e.g., `cp ./benchmark/ens.yaml .`)
- The smart contract ABIs of your application must be put in a folder named `contracts` in `nodes` directory. The ABIs of the benchmark applications are in the folders `./nodes/contracts-<APP_NAME>`. In order to use them copy the ABIs in the contracts folder (`cp ./nodes/contracts-ens ./nodes/contracts`)
- Deploy with `xopera` (i.e. `opera deploy -i input.yml ens.yaml`)


## Benchmark Applications
- Ethreum Name Service (ENS): a DNS working on Ethereum
- dydx: DeFi application
- Dark Forest: on chain game that uses the Diamond pattern. 


**PAY ATTENTION**: if you want to deploy Dark Forest smart contracts you will probably need to disable the smart contract size constraint and increase the gas limit (i.e. start Ganache with these parameters `ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize`) because some contracts are quite large. If this doesn't work try to check if you are running out of gas and increase the allowed gas per transaction.

## Compute Number of Tokens

Number of Tokens analysis compares the TOSCA specification files with the original deployment scripts to show how KATENA enables users to achieve the same result with less effort.
Folders [df](./not-comparison/dark-forest/), [dydx](./not-comparison/dydx/), and [ens](./not-comparison/ens/) contain the Katena and the original deployment files.
The deployment files modified according to the paper (i.e., logs generation and comments are removed, `.` is counts as a token separator) and the Python script used to perform the NoT comparison are in the [metrics-token](./not-comparison/metrics-token/) folder.

To run the generation of Number of Tokens used in the paper, move into the [metrics-token](./metrics-token/) (`cd ./metrics-token`) folder. It contains the following scripts:

- [run-not-evaluation-all](./run-not-evaluation-all.sh): run the evaluation for all the three applications:
    ```
    ./run-not-evaluation-all.sh
    ```

- [run-not-evaluation-single-bench](./run-not-evaluation-single-bench.py): calculates the YAML and JS/TS tokens for an application. It needs the directory as input:
    ```
    python run-not-evaluation-single-bench.py --directory DIRECTORY_PATH
    ```

- [tokens-single-file](./tokens-single-file.py): calculates the tokens for a single file (YAML or JS/TS). It needs the file path as input:
    ```
    python tokens-single-file.py --file FILE_PATH
    ```


## Repository structure

- [Benchmark](./benchmark/): contains Service Template for app used in evaluation: dydx, dark forest, ens.

- [Examples](./examples/): files used to test the implementation. Contains basic use cases to test relationships, library linkage, and diamond pattern.

- [Nodes](./nodes/): contains:
    - smart contract ABIs used by xopera to deploy smart contracts (folders `contracts-*`)
    - Ansible playbooks attached to xopera node and relationships types (folder `playbooks`)
    - Python scripts used to communicate with the chain (using Web3.py) (folder `scripts`)
    - all the node, relationships, capabilities, and relationships used to model the dApps (files `capabilities.yaml`, `contract.yaml`, `network.yaml`, `relationships.yaml`, `wallet.yaml`)


- [NoT-comparison](./not-comparison/) files used for the evaluation using the Number of Tokens (NoT) metric.

- [Smart Contract Example](./smart-contract-example/): contains a truffle project used to test and use JS and TS capabilities to use functions of the benchmark apps
