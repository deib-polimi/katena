#!/bin/bash

# remove cache
rm -r ./.opera &> /dev/null
rm -r .katena  &> /dev/null
# rebuild .katena structure
mkdir .katena
cp -r templates/* .katena
mkdir .katena/contracts &> /dev/null

npx ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize --account_keys_path .katena/accounts.json 

