# KATENA
Operations on Blockchain with TOSCA.

This repo contains all the files needed to setup and run the experiments used in the evaluation of KATENA.
The prototype has been tested on Ubuntu 20.04.

**NOTE**: to reproduce the experiments reported in the paper refer to [Experiments Reproducibility](#experiments-reproducibility) section. For each experiment, we provided the required step to run them.
 <!-- The rest of the README contains the information to start deploying your dApps with KATENA. -->

**NOTE**: we added a [Answers for the reviewers](#answers-for-the-reviewers) section to clarify their doubts and explain what we modified in our new submission.
## Experiments Reproducibility
What should be reproduced in this repo:
- **Benchmark application deployment**: deploy the three applications (dark forest, dydx, ens) analyzed in the paper on Ganache. To reproduce the experiments, we recommend using the Docker image with the script [run-deploy.sh](./run-deploy.sh). In order to use it:
    - `docker build -t katena .`: build the docker image
    - `docker run -it katena`: run the container.
    - `./run-deploy.sh`: inside the container run the script to deploy applications. The script automatically:
        - Bootstrap a Ganache instance.
        - Retrieves the credentials of Account 0 and uses them to pay for transactions on Ganache.
        - Deploys ENS, Dark Forest, and DYDX. 
  
  Note that depending on your hardware configuration this step could take a while (approximatively 10/20 minutes).
  It succeeds if this is the output:
```
deploying ens...
ens deployed successfully
deploying dark-forest...
dark-forest deployed successfully
deploying dydx...
dydx deployed successfully
```
- **Numer of tokens analysis**: run the scripts to compare the difference in Number of Tokens between KATENA specification files used to deploy the applications and the original deployment scripts. To run the experiment:
    - run `./run-not-evaluation-all.sh`. You can run this script either inside or outside the container. For further details, refer to [Compute Number of Tokens](#compute-number-of-tokens) section.
The experiment succeeds if the output is:
```
dark-forest
YAML: 304
JS: 1765
ens
YAML: 87
JS: 95
dydx
YAML: 559
JS: 923
```
<!-- 
## Getting Started
In order to start deploying your own dApps using KATENA, we strongly recommend looking at the files in [Examples](./examples/) and [Benchmark](./benchmark/) folders. 
KATENA can be used with our [Docker](https://www.docker.com/) image.

a Python virtual environment on your local machine  

### Docker setup
If you want to deploy your applications on Ganache, you will need two terminals active at the same time: one for running Ganache and another one for KATENA.

The required steps are the following for the first terminal:
- `docker build -t katena .`: build the docker image
- `docker run -it katena`: run the container.
- `npx ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize`: create a [ganache](https://trufflesuite.com/ganache/) instance, that will be our locally hosted Blockchain. Ganache will prompt a set of accounts and private keys to use in the next steps. Alternatively, you can use the `--account_keys_path accounts.json` to print that information in the file `accounts.json` (you can find them at the end of the file looking for `private_keys` key). See [benchmarks](#benchmark-applications) section to understand why we choose those parameters.

Keep ganache running and open a new terminal inside the container:
- Retrieve the `<container_id>` with `docker ps`.
- `docker exec -it <container_id> /bin/bash` start the new terminal inside the container. 
- Create `input.yml` file to store your wallet credentials. Ganache will prompt that information as shown in the [figure](images/ganache-accounts.jpg) below (or in the `accounts.json` if you used the flag described above). Choose one of the `Available accounts` and its `Private Key`, in `input.yml` create the keys `UserWallet` and `UserKeyGanache`, and paste the two values respectively. Example:
```
UserWallet: '<account>'
UserKeyGanache: '<private_key>'
```
Use [input.example.yaml](./input.example.yaml) as example.

![available accounts and private keys in ganache](./images/ganache-accounts.jpg)

- run the [deploy-bench.sh](./deploy-bench.sh) script to automatically deploy the three benchmark applications. In case of errors, the script generates a log stored in the file `deploy.log`. It took 10/20 minutes to complete the entire procedure.
This script automates the following operations (that you should do manually if you are using KATENA to deploy your personal dApp):
    - Move the YAML file containing the application description to the project root (e.g., `cp ./benchmark/ens.yaml .`)
    - The smart contract ABIs of your application must be put in a folder named `contracts` in `nodes` directory. The ABIs of the benchmark applications are in the folders `./nodes/contracts-<APP_NAME>`.
    - Deploy with `xopera` (e.g., `opera deploy -i input.yml ens.yaml`)

### Local setup

**This setting is an alternative to the docker setup. If you are using docker, skip this section**

To use KATENA on your local machine you need:
- We tested our prototype on Ubuntu 20.04.4
- `python 3.8`
- `pip`
- [xopera orchestrator](https://github.com/xlab-si/xopera-opera#installation-and-quickstart)
- [ganache](https://trufflesuite.com/ganache/): this is required to bootstrap a blockchain hosted locally. You can either use this or another Ethereum-compatible client (e.g., [geth](https://geth.ethereum.org/)).


Do the following steps:
- Run a Ganache instance with the command `ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize` (see [benchmarks](#benchmark-applications) section to understand why we choose those parameters). It will prompt a set of accounts and private keys to use in the next step.
- Create the `input.yml` file that stores your wallet credentials. Ganache will prompt that information as shown in the [figure](images/ganache-accounts.jpg). Choose one of the accounts and its private key, in `input.yml` create the keys `UserWallet` and `UserKeyGanache`, and paste the values respectively. Example:
```
UserWallet: '<account>'
UserKeyGanache: '<private_key>'
```
Use `input.example.yaml` as example. 


- Install the required packages with `pip` (file located [here](./requirements.txt)) (`pip install -r requirements.txt`)
- Move the YAML file containing the application description to the project root (e.g., `cp ./benchmark/ens.yaml .`)
- The smart contract ABIs of your application must be put in a folder named `contracts` in `nodes` directory. The ABIs of the benchmark applications are in the folders `./nodes/contracts-<APP_NAME>`. In order to use them copy the ABIs in the contracts folder (`cp -r ./nodes/contracts-ens ./nodes/contracts`)
- Deploy with `xopera` (i.e. `opera deploy -i input.yml ens.yaml`)  -->

## Compute Number of Tokens

Number of Tokens analysis compares the TOSCA specification files with the original deployment scripts to show how KATENA enables users to achieve the same result with less effort.
Folders [df](./not-comparison/dark-forest/), [dydx](./not-comparison/dydx/), and [ens](./not-comparison/ens/) contain the Katena and the original deployment files.
The deployment files modified according to the paper (i.e., logs generation and comments are removed, `.` is counts as a token separator) and the Python script used to perform the NoT comparison are in the [metrics-token](./not-comparison/metrics-token/) folder.

**IMPORTANT**: to run the generation of Number of Tokens used in the paper, move into the [metrics-token](./not-comparison/metrics-token/) (`cd ./not-comparison/metrics-token/`) folder. 
The script to run the analysis on all the application is [run-not-evaluation-all](./run-not-evaluation-all.sh) (see below for usage). 
The [metrics-token](./not-comparison/metrics-token/) contains the following scripts:

- [run-not-evaluation-all](./run-not-evaluation-all.sh): run the evaluation for all the three applications:
    ```
    ./run-not-evaluation-all.sh
    ```

- [run-not-evaluation-single-bench](./run-not-evaluation-single-bench.py): calculates the YAML and JS/TS tokens for an application. It needs the directory as input:
    ```
    python run-not-evaluation-single-bench.py --directory DIRECTORY_PATH
    ```
    Example:
    ```
    python run-not-evaluation-single-bench.py --directory ens
    ```

- [tokens-single-file](./tokens-single-file.py): calculates the tokens for a single file (YAML or JS/TS). It needs the file path as input:
    ```
    python tokens-single-file.py --file FILE_PATH
    ```
    Example:
    ```
    python tokens-single-file.py --file ens/ens.yaml
    ```

## Benchmark Applications
- Ethreum Name Service (ENS): a DNS working on Ethereum
- dydx: DeFi application
- Dark Forest: on-chain game that uses the Diamond pattern. 


**PAY ATTENTION**: if you want to deploy Dark Forest smart contracts you will probably need to disable the smart contract size constraint and increase the gas limit (i.e. start Ganache with these parameters `ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize`) because some contracts are quite large. If this doesn't work try to check if you are running out of gas and increase the allowed gas per transaction.



## Repository structure

- [Benchmark](./benchmark/): contains Service Template for app used in evaluation: dydx, dark forest, ens.

- [Examples](./examples/): files used to test the implementation. Contains basic use cases to test relationships, library linkage, and diamond pattern.

- [Nodes](./nodes/): contains:
    - smart contract ABIs used by xopera to deploy smart contracts (folders `contracts-*`)
    - Ansible playbooks attached to xopera node and relationships types (folder `playbooks`)
    - Python scripts used to communicate with the chain (using Web3.py) (folder `scripts`)
    - all the node, relationships, capabilities, and relationships used to model the dApps (files `capabilities.yaml`, `contract.yaml`, `network.yaml`, `relationships.yaml`, `wallet.yaml`)


- [NoT-comparison](./not-comparison/) files used for the evaluation using the Number of Tokens (NoT) metric.

<!-- - [Smart Contract Example](./smart-contract-example/): contains a truffle project used to test and use JS and TS capabilities to use functions of the benchmark apps -->


## Answers for the reviewers
We thank the reviewers for their precious feedback. We modified the README to solve their doubts and here below we reported a few comments:

- We decided to add a script to automate the entire deployment of applications [run-deploy.sh](./run-deploy.sh). See the [Experiments Reproducibility](#experiments-reproducibility) sections to use it. Now the required steps are: build and run the container, and launch the two scripts.
- We recommend using the Docker setup to evaluate the artifact. The Local setup is meant to be used if you want to run the artifact on your OS (without any form of containerization). Since the guidelines of the artifact evaluation encourage providing a Dockerized environment, we suggest to use this one.
- We updated `deploy-bench.sh` to output the error in case of errors. If you want to check it in detail, see `deploy.log` file where xOpera outputs any error.
- Be sure that your Ganache version is running on the default port 8545 while you are deploying the applications.
- Another error that occurred in the Local setup is reported by reviewer 2 in `deploy-windows.log`. To use Katena with the local setup python 3.8 should be your default interpreter. The error is at line 1614 of the file and means that Katena can not find the python interpreter. This is solved in the Docker image by creating a link: `ln -s /usr/bin/python3 /usr/bin/python`. However, we discourage this method on your hardware, just be sure that when you call `python` in your terminal, it uses python 3.8.
- To run the experiments now you will need only one terminal. Follow the instructions in [Experiments Reproducibility](#experiments-reproducibility). In case you want to use KATENA and deploy your dApps on Ganache, you will need two of them. See [Getting Started](#getting-started) section.

