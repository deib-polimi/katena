#!/bin/bash

# RUN DEPLOY
read -p 'Choose a contract: ' APP
echo "the contract to be deployed is: ${APP}"

# to format the accounts info into a better readable format
cat accounts.json | jq > accounts-pretty.json
IFS=: read -r ACCOUNT PRIVATE_KEY <<< $(awk '/"private_keys"/{getline; print}' accounts-pretty.json)

PRIVATE_KEY=${PRIVATE_KEY::-1}

ACCOUNT=$(echo $ACCOUNT | sed "s/\"/'/g")

PRIVATE_KEY=$(echo $PRIVATE_KEY | sed "s/\"/'/g")

echo "Your account is: ${ACCOUNT}"
echo "Your private key is: ${PRIVATE_KEY}"
rm input.yml &> /dev/null

# rigth into the opera input file
cat << EOF > input.yml
UserKeyGanache: $PRIVATE_KEY
UserWallet: $ACCOUNT
EOF

echo "deploying ${APP}..."
rm -r ./.opera &> /dev/null
cp ./examples/$APP.yaml .
rm -r ./nodes/contracts &> /dev/null
mkdir ./nodes/contracts &> /dev/null
#cp ./nodes/contracts-$APP/* ./nodes/contracts
cp ./nodes/contracts-example/* ./nodes/contracts
opera deploy -r -i input.yml ./$APP.yaml -v > deploy.log
status=$?
if [ $status -eq 0 ]
then
    echo "${APP} deployed successfully"
else
    grep -w "stderr" deploy.log | tail -1
    exit 2
fi
rm ./$APP.yaml &> /dev/null
rm -r ./nodes/contracts &> /dev/null
rm accounts.json
rm accounts-pretty.json