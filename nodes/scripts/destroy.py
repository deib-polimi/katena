import sys
from web3 import Web3
import argparse
import json

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--contractAbi', type=str, help='ABI of the smart contract to deploy')
parser.add_argument('--address', type=str, help='contract address')
parser.add_argument('--destroyFunction', nargs='?', default='', help='function to call in order to self destruct the contract')
parser.add_argument('--refund', type=str, help='address to send the refund of contract destruction')

args = parser.parse_args()


# exit succesfully if the contract does not have a self destruct function
if args.destroyFunction is None:
    sys.exit(0)

with open(f'contracts/{args.contractAbi}.json') as f:
    contract_json = json.load(f)

abi = contract_json['abi']
bytecode = contract_json['bytecode']

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)
contract = w3.eth.contract(address=args.address, abi=abi, bytecode=bytecode)

try:
    destroy_function = getattr(contract.functions, args.destroyFunction)
except AttributeError as e:
    print(f'Failed to retrieve method {args.destroyFunction} in contract {args.address}')
    sys.exit(-1)


tx_hash = destroy_function(w3.toChecksumAddress(args.refund)).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

