## Compute Number of Tokens

Number of Tokens analysis compares the TOSCA specification files with the original deployment scripts to show how KATENA enables users to achieve the same result with less effort.
Folders [df](./not-comparison/dark-forest/), [dydx](./not-comparison/dydx/), and [ens](./not-comparison/ens/) contain the Katena and the original deployment files.
The deployment files modified according to the paper (i.e., logs generation and comments are removed, `.` is counts as a token separator) and the Python script used to perform the NoT comparison are in the [metrics-token](./not-comparison/metrics-token/) folder.

**IMPORTANT**: To run the evaluation as described in [Experiments Reproducibility](./README.md#experiments-reproducibility) section of the README, use the [run-not-evaluation-all](./run-not-evaluation-all.sh) script. It runs the evaluation for all the three applications:
    ```
    ./run-not-evaluation-all.sh
    ```

**NOTE**: Once you run the script above, you have reproduced the experiments in the paper. Here we report additional script used during the generation of Number of Tokens. Move into the [metrics-token](./not-comparison/metrics-token/) (`cd ./not-comparison/metrics-token/`) folder. 
The script to run the analysis on all the application is [run-not-evaluation-all](./run-not-evaluation-all.sh) (see below for usage). 
The [metrics-token](./not-comparison/metrics-token/) contains the following scripts:

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