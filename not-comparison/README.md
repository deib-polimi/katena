# NoT evaluation
Folders [df](./df/), [dydx](./dydx/), and [ens](./ens/) contains the Katena and the original deployment files.
The deployment files modified according to the paper (i.e., logs generation and comments are removed, `.` is counts as a token separator) and the Python script used to perform the NoT comparison are in the [metrics-token](./metrics-token/) folder.

# Launch the experiments

To run the experiments, use the files in the [metrics-token](./metrics-token/) folder. It contains the following scripts:

- [tokens-single-file](./metrics-token/tokens-single-file.py): calculates the tokens for a single file (YAML or JS/TS). It needs the file path as input:
    ```
    python tokens-single-file.py --file FILE_PATH
    ```
- [run-not-evaluation-single-bench](./metrics-token/run-not-evaluation-single-bench.py): calculates the YAML and JS/TS tokens for an application. It needs the directory as input:
    ```
    python run-not-evaluation-single-bench.py --directory DIRECTORY_PATH
    ```
- [run-not-evaluation-all](./metrics-token/run-not-evaluation-all.sh): run the evaluation for all the three applications:
    ```
    ./run-not-evaluation-all.sh
    ```
