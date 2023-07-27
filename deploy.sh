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

