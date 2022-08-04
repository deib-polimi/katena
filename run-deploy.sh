rm accounts.json &> /dev/null
rm accounts-pretty.json &> /dev/null
npx ganache-cli -l 10000000 -g 1 --allowUnlimitedContractSize -q --account_keys_path accounts.json &


sleep 10

cat accounts.json | jq > accounts-pretty.json

IFS=: read -r ACCOUNT PRIVATE_KEY <<< $(awk '/"private_keys"/{getline; print}' accounts-pretty.json)

PRIVATE_KEY=${PRIVATE_KEY::-1}

# PRIVATE_KEY=${PRIVATE_KEY^^}

# ACCOUNT=${ACCOUNT^^}

ACCOUNT=$(echo $ACCOUNT | sed "s/\"/'/g")

PRIVATE_KEY=$(echo $PRIVATE_KEY | sed "s/\"/'/g")

echo $ACCOUNT
echo $PRIVATE_KEY
rm input.yml

cat << EOF > input.yml
UserKeyGanache: $PRIVATE_KEY
UserWallet: $ACCOUNT
EOF


./deploy-bench.sh