import argparse
import json
from utils import CONTRACTS_DIR

parser = argparse.ArgumentParser()
parser.add_argument('--abi', type=str, help='ABI of the smart contract to deploy')

args = parser.parse_args()

with open(f'{CONTRACTS_DIR}/{args.abi}.json') as f:
    contract_json = json.load(f)

print(contract_json['bytecode'])