#!/bin/sh


for APP in dark-forest ens dydx;
do
    python run-not-evaluation-single-bench.py --directory $APP
done;