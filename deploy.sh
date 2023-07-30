#!/bin/bash

#############################################################################
#   INPUT PARAMETERS   &  HELP FUNNCTION                                    #
#############################################################################
helpFunction()
{
   echo ""
   echo "Usage: $0  -f  -c "
   echo -e "\t-f      : .yaml file with the topology of the deployment"
   echo -e "\t-c : directory where the abi contracts are stored"
   exit 1 # Exit script after printing help
}

while getopts "f:c:" opt
do
   case "$opt" in
      f ) TEMPLATE_TOPOLOGY="$OPTARG" ;;
      c ) CONTRACTSPATH="$OPTARG" ;;
      ? ) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

# Print helpFunction in case parameters are empty
if [ -z "$TEMPLATE_TOPOLOGY" ] || [ -z "$CONTRACTSPATH" ]
then
   echo "Some or all of the parameters are empty";
   helpFunction
fi

#############################################################################
#     REMOVE CACHE FILES                                                    #
#############################################################################
rm -r ./.opera &> /dev/null
rm -r .katena  &> /dev/null
# rebuild .katena structure
mkdir .katena
cp -r templates/* .katena
mkdir .katena/contracts &> /dev/null

######################################################################
#     RUN GANACHE AND GET ACCOUNT AND PRIVATE KEYS                          #
#############################################################################
npx ganache-cli --quiet -l 10000000 -g 1 --allowUnlimitedContractSize --account_keys_path .katena/accounts.json &


sleep 10

# to format the accounts info into a better readable format
cat .katena/accounts.json | jq > .katena/accounts-pretty.json
IFS=: read -r ACCOUNT PRIVATE_KEY <<< $(awk '/"private_keys"/{getline; print}' .katena/accounts-pretty.json)

PRIVATE_KEY=${PRIVATE_KEY::-1}

ACCOUNT=$(echo $ACCOUNT | sed "s/\"/'/g")

PRIVATE_KEY=$(echo $PRIVATE_KEY | sed "s/\"/'/g")

echo "Your account is: ${ACCOUNT}"
echo "Your private key is: ${PRIVATE_KEY}"

cat << EOF > .katena/input.yml
UserKeyGanache: $PRIVATE_KEY
UserWallet: $ACCOUNT
EOF

#############################################################################
#     deploy                                                                #
#############################################################################
cd /katena
APP=$(basename "$TEMPLATE_TOPOLOGY")
echo "deploying ${APP}..."

# get topology
cp -r $CONTRACTSPATH/* .katena/contracts
rm .katena/contracts/*.yaml
cp  $TEMPLATE_TOPOLOGY .katena


cd .katena
opera deploy -r -i input.yml $APP -v > deploy.log
status=$?
if [ $status -eq 0 ]
then
    echo "${APP} deployed successfully"
else
    grep -w "stderr" deploy.log | tail -1
    exit 2
fi

