Folders [df](./df/), [dydx](./dydx/), and [ens](./ens/) contains the Katena and the original deployment files.
The deployment files modified according to the paper and the Python script used to perform the NoT comparison are in the [metrics-token](./metrics-token/) folder.

# Launch the experiments

```
python tokens.py --yaml [path to Katena file] --js [path to Truffle of Hardhat script]
```