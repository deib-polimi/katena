from utils import parse_parameters
from web3 import Web3
import argparse
import json
from utils import CONTRACTS_DIR

'''
The implementation contract deploy differs from the usual contract deploy.
The aim of the implementation contract is just to store the logic functions.
The store of this contract must not be used and it will not be called directly.
Its functions are call via another contract that will do a DELEGATECALL.

The constructor must be call empty (no state) and its intialize function is call
on its proxy.
'''
parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str)
parser.add_argument('--privateKey', type=str)
parser.add_argument('--contractAbi', type=str)

args = parser.parse_args()

with open(f'{CONTRACTS_DIR}/{args.contractAbi}.json') as f:
    contract_json = json.load(f)

ABI = contract_json['abi']
BYTECODE = contract_json['bytecode']

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)
contract = w3.eth.contract(abi=ABI, bytecode=BYTECODE)

tx_hash = contract.constructor().transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt.contractAddress)

