#!/bin/bash

# remove cache
rm -r .katena  &> /dev/null
mkdir .katena

npx ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize --account_keys_path .katena/accounts.json
