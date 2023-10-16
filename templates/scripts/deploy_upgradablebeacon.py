from web3 import Web3, HTTPProvider
import argparse
import json

from utils import parse_parameters
from utils import CONTRACTS_DIR

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--abi', type=str, help='ABI of the smart contract to deploy')
parser.add_argument('--params', nargs='*', help='address of the beacon')

args = parser.parse_args()

# TO SIGN ALL THE TRANSACTIONS
w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

# DEFINE VARIABLES

with open(f'{CONTRACTS_DIR}/{args.abi}.json') as f:
    upgradeproxy_contract_json = json.load(f)
UPGRADE_ABI = upgradeproxy_contract_json['abi']
UPGRADE_BYTECODE = upgradeproxy_contract_json['bytecode']

# constructor parameters
params = args.params

initializer_inputs = [] 
for function in UPGRADE_ABI:
    if function['type'] == 'constructor':
        initializer_inputs = function['inputs']
        break

params_ = parse_parameters(initializer_inputs, params, [])

# deploy upgradable
upgradable = w3.eth.contract(abi=UPGRADE_ABI, bytecode=UPGRADE_BYTECODE)
tx_hash = upgradable.constructor(*params_).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt.contractAddress)