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

parser.add_argument('--beaconAddress', type=str, help='address of the beacon')

args = parser.parse_args()

# TO SIGN ALL THE TRANSACTIONS
w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

# DEFINE VARIABLES
BEACON_ADDR = args.beaconAddress

with open(f'{CONTRACTS_DIR}/{args.abi}.json') as f:
    upgradeproxy_contract_json = json.load(f)
UPGRADE_ABI = upgradeproxy_contract_json['abi']
UPGRADE_BYTECODE = upgradeproxy_contract_json['bytecode']

# deploy upgradable
upgradable = w3.eth.contract(abi=UPGRADE_ABI, bytecode=UPGRADE_BYTECODE)
tx_hash = upgradable.constructor(w3.toChecksumAddress(BEACON_ADDR)).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print("proxy contract",tx_receipt.contractAddress)