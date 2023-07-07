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
#     GET ACCOUNT AND PRIVATE KEYS                                          #
#############################################################################


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
#     RUN OPERA & DEPLOY APP                                                #
#############################################################################
APP=$(basename "$TEMPLATE_TOPOLOGY")
echo "deploying ${APP}..."

# remove cacheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
rm -r ./.opera &> /dev/null
#rm .katena

# get artifacts and topology
rm -r ./.katena/contracts &> /dev/null
mkdir .katena/contracts &> /dev/null
find $CONTRACTSPATH -type f ! -name "*.yaml" -exec cp {} .katena/contracts \;
# get topology
cp $TEMPLATE_TOPOLOGY .katena/
cp -r templates/* .katena

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
