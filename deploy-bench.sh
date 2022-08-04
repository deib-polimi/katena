#!/bin/bash

for APP in ens dark-forest dydx;
do
    echo "deploying ${APP}..."
    rm -r ./.opera &> /dev/null
    cp ./benchmark/$APP.yaml .
    rm -r ./nodes/contracts &> /dev/null
    mkdir ./nodes/contracts &> /dev/null
    cp ./nodes/contracts-$APP/* ./nodes/contracts
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
done;

rm accounts.json
rm accounts-pretty.json