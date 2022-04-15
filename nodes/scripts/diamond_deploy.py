from dis import Bytecode
from enum import Enum
from typing import Any
from eth_utils import function_abi_to_4byte_selector
from web3 import Web3
import argparse
import json

class FacetAction(Enum):
    Add = 0
    Replace = 1
    Delete = 2

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
parser.add_argument('--cutAbi', type=str, help='diamond cut ABI')
parser.add_argument('--cutAddress', type=str, help='diamond cut address')
parser.add_argument('--loupeAbi', type=str, help='diamond loupe ABI')
parser.add_argument('--loupeAddress', type=str, help='diamond loupe address')

args = parser.parse_args()

with open(f'contracts/{args.contractAbi}.json') as f:
    diamond_json = json.load(f)

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = signer.address
diamond = w3.eth.contract(abi=diamond_json['abi'], bytecode=diamond_json['bytecode'])

contracts = {args.cutAbi: args.cutAddress, args.loupeAbi: args.loupeAddress}
diamond_cut = []

for contract_abi, contract_address in contracts.items():
    with open(f'contracts/{contract_abi}.json') as f:
        contract_json = json.load(f)
    
    selectors = []
    contract = w3.eth.contract(abi=contract_json['abi'], bytecode=contract_json['bytecode'])
    
    for function in contract.abi:
        if function["type"] == 'function':
            print(function)
            selector = function_abi_to_4byte_selector(function)
            selectors.append(selector)
    diamond_cut.append([contract_address, FacetAction.Add.value, selectors])

tx_hash = diamond.constructor(diamond_cut).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt.contractAddress)
