#!/bin/bash

# RUN
rm accounts.json &> /dev/null
rm accounts-pretty.json &> /dev/null
npx ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize -q --account_keys_path accounts.json
