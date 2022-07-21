#!/bin/bash

for APP in dark-forest ens dydx;
do
    @rm -r ./.opera
    cp ./benchmark/$APP.yaml .
    @rm -r ./nodes/contracts
    @mkdir ./nodes/contracts
    cp ./nodes/contracts-$APP/* ./nodes/contracts
    opera deploy -r -i input.yml ./$APP.yaml -v > deploy.log
    status=$?
    [ $status -eq 0 ] && echo "${APP} deployed successfully" || exit 2
    rm ./$APP.yaml
    rm -r ./nodes/contracts
done;