from typing import Any
from web3 import Web3
import argparse
import json

def convert(data_type: str, value: str) -> Any:
    if "int" in data_type or "fixed" in data_type:
        return int(value)
    elif data_type == "bool":
        return bool(value)
    elif "bytes" in data_type:
        return value.encode()
    else:
        return value


parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--contractAbi', type=str, help='ABI of the smart contract to deploy')
parser.add_argument('--params', nargs='*', help='contract input parameters')


args = parser.parse_args()

with open(f'contracts/{args.contractAbi}.json') as f:
    contract_json = json.load(f)

abi = contract_json['abi']
bytecode = contract_json['bytecode']

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = signer.address
contract = w3.eth.contract(abi=abi, bytecode=bytecode)

casted_params = []

constructor_inputs = []
for function in contract.abi:
    if function['type'] == 'constructor':
        constructor_inputs = function['inputs']

for index, param in enumerate(constructor_inputs):
    casted_params.append(convert(param['type'], args.params[index]))

tx_hash = contract.constructor(*casted_params).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt.contractAddress)

