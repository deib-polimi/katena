from web3 import Web3
import argparse
import json

from utils import CONTRACTS_DIR, parse_parameters

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--bytecode', type=str, help='contract bytecode')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--proxyAbi', type=str, help='ABI of the proxy to deploy')
parser.add_argument('--implementationAddress', type=str, help='proxy implementation address') 
parser.add_argument('--implementationAbi', type=str, help='proxy implementation abi') # to call initializer
parser.add_argument('--implementationParameters', type=str, help='proxy implementation parameters to save in proxy storage')
parser.add_argument('--adminAddress', type=str, help='proxy admin contract address')

args = parser.parse_args()

# TO SIGN ALL THE TRANSACTIONS
w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

# DEFINE VARIABLES
#  PROXY CONTRACT
with open(f'{CONTRACTS_DIR}/{args.proxyAbi}.json') as f:
    proxy_json = json.load(f)
PROXY_ABI = proxy_json['abi']
PROXY_BYTECODE = args.bytecode
#  IMPLEMENTATION CONTRACT
with open(f'{CONTRACTS_DIR}/{args.implementationAbi}.json') as f:
    proxy_json = json.load(f)
IMP_ABI = proxy_json['abi']
IMP_ADDRS = w3.toChecksumAddress(args.implementationAddress)
#  PROXY ADMIN CONTRACT
ADM_ADDRS = w3.toChecksumAddress(args.adminAddress)

# to type the params as the function requires
initializer_inputs = [] 
for function in IMP_ABI:
    if function['name'] == 'initialize':
        initializer_inputs = function['inputs']
        break
    
# logic contract constructor parameters
params = parse_parameters(initializer_inputs, args.implementationParameters, [])

# BUILD CONTRACT PROXY
proxy = w3.eth.contract(abi=PROXY_ABI, bytecode=PROXY_BYTECODE)
imp = w3.eth.contract(address=IMP_ADDRS, abi=IMP_ABI)
initializer = imp.encodeABI(fn_name="initialize", args=params) # function signature

tx_hash = proxy.constructor(IMP_ADDRS,ADM_ADDRS. initializer).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt.contractAddress)