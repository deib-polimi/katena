#!/bin/sh

cd $PWD/not-comparison/metrics-token

for APP in dark-forest ens dydx beacon;
do
    python run-not-evaluation-single-bench.py --directory $APP
done;