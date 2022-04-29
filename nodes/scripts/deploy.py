from utils import parse_parameters
from web3 import Web3
import argparse
import json

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--contractAbi', type=str, help='ABI of the smart contract to deploy')
parser.add_argument('--params', nargs='*', help='contract input parameters')
parser.add_argument('--addressParams', nargs='*', help='contract input address parameters')
parser.add_argument('--bytecode', type=str, help='contract bytecode')

args = parser.parse_args()

with open(f'contracts/{args.contractAbi}.json') as f:
    contract_json = json.load(f)

abi = contract_json['abi']

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = signer.address
contract = w3.eth.contract(abi=abi, bytecode=args.bytecode)

constructor_inputs = []
for function in contract.abi:
    if function['type'] == 'constructor':
        constructor_inputs = function['inputs']
        break


params = args.params
address_params = args.addressParams
casted_params = parse_parameters(constructor_inputs, params, address_params)

if args.contractAbi == 'PolynomialInterestSetter':
    for p in args.params:
        print(p)
# 
    print('---------------')
    print(f'a {casted_params}')
    for p in casted_params:
        print(f'{p} {type(p)}')
tx_hash = contract.constructor(*casted_params).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt.contractAddress)

