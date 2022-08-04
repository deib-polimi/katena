import sys
from web3 import Web3
import argparse
import json

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network in which the caller has been deployed. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--callerPrivateKey', type=str, help='private key to sign transactions')
parser.add_argument('--callerAbi', type=str, help='ABI of the caller smart contract for setting the callee address')
parser.add_argument('--callerAddress', type=str, help='caller contract address')
parser.add_argument('--callerAddressSetter', type=str, help='function to call in order to set the address')
parser.add_argument('--calleeAddress', type=str, help='callee address to pass as input to --callerAddressSetter')

args = parser.parse_args()

with open(f'contracts/{args.callerAbi}.json') as f:
    contract_json = json.load(f)

abi = contract_json['abi']
bytecode = contract_json['bytecode']

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

signer = w3.eth.account.from_key(args.callerPrivateKey)
w3.eth.default_account = w3.toChecksumAddress(signer.address)
caller = w3.eth.contract(address=args.callerAddress, abi=abi, bytecode=bytecode)
try:
    function = getattr(caller.functions, args.callerAddressSetter)
except AttributeError:
    print(f'Failed to retrieve method {args.callerAddressSetter} in contract {caller}')
    sys.exit(-1)

tx_hash = function(w3.toChecksumAddress(args.calleeAddress)).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)