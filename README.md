# KATENA
Operations on Blockchain with TOSCA.

This repo contains all the files needed to setup and run the experiments used in the evaluation of KATENA.
The prototype has been tested on Ubuntu 20.04.

**NOTE**: to reproduce the experiments reported in the paper refer to [Experiments Reproducibility](#experiments-reproducibility) section. For each experiment, we provided the required step to run them.
If you want further information on how to use KATENA to deploy your applications refer to [Development](DEVELOPMENT.md) file. For extra information on Number of Tokens computation see [here](./NUMBER_OF_TOKENS.md).

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
    - run `./run-not-evaluation-all.sh`. You can run this script either inside or outside the container. For further details, refer to [Number of Tokens](./NUMBER_OF_TOKENS.md) file.
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

- We reorganized the README structure. Everything needed to reproduce the experiments is in this README with some information on the repository structure and the benchmark applications. Additional information on how to use KATENA and how the Number of Tokens is computed can be found in [Development](./DEVELOPMENT.md) and [Number of Tokens](./NUMBER_OF_TOKENS.md) files.
- We decided to add a script to automate the entire deployment of applications [run-deploy.sh](./run-deploy.sh). See the [Experiments Reproducibility](#experiments-reproducibility) sections to use it. Now the required steps are: build and run the container, and launch the two scripts.
- To run the experiments now you will need only one terminal. Follow the instructions in [Experiments Reproducibility](#experiments-reproducibility). In case you want to use KATENA and deploy your dApps on Ganache, you will need two of them. See the [Development](./DEVELOPMENT.md) file.
- We recommend using the Docker setup to evaluate the artifact. The Local setup is meant to be used if you want to run the artifact on your OS (without any form of containerization). Since the guidelines of the artifact evaluation encourage providing a Dockerized environment, we suggest to use this one.
- We updated `deploy-bench.sh` to output the error in case of errors. If you want to check it in detail, see `deploy.log` file where xOpera outputs any error.
- Be sure that your Ganache version is running on the default port 8545 while you are deploying the applications. Ganache displays this information when it starts.
- Another error that occurred in the Local setup is reported by reviewer 2 in `deploy-windows.log`. To use Katena with the local setup python 3.8 should be your default interpreter. The error is at line 1614 of the file and means that Katena can not find the python interpreter. This is solved in the Docker image by creating a link: `ln -s /usr/bin/python3 /usr/bin/python`. However, we discourage this method on your hardware, just be sure that when you call `python` in your terminal, it uses python 3.8.


