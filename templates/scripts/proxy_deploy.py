from web3 import Web3
import argparse
import json
from utils import CONTRACTS_DIR, parse_parameters

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--contractAbi', type=str, help='ABI of the smart contract to deploy')
parser.add_argument('--implementationAddress', type=str, help='proxy implementation address')
parser.add_argument('--implementationParams',  nargs='*', help='proxy implementation initializer parameters')
parser.add_argument('--implementationAbi', type=str, help='proxy implementation abi')
parser.add_argument('--bytecode', type=str, help='contract bytecode')


args = parser.parse_args()

with open(f'{CONTRACTS_DIR}/{args.contractAbi}.json') as f:
    proxy_json = json.load(f)

with open(f'{CONTRACTS_DIR}/{args.implementationAbi}.json') as f:
    imp_json = json.load(f)
IMP_ABI = imp_json['abi']
IMP_ADRSS = args.implementationAddress

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)
proxy = w3.eth.contract(abi=proxy_json['abi'], bytecode=args.bytecode)
imp = w3.eth.contract(address=IMP_ADRSS, abi=IMP_ABI)

params = args.implementationParams

# to type the params as the function requires
try: 
    initializer_inputs = [] 
    for function in IMP_ABI:
        if function['name'] == 'initialize':
            initializer_inputs = function['inputs']
            break
        
    params = parse_parameters(initializer_inputs, params, [])
    initializer = imp.encodeABI(fn_name="initialize", args=params)
except:
    initializer = b''

    
params = parse_parameters(initializer_inputs, params, [])
initializer = imp.encodeABI(fn_name="initialize", args=params)

tx_hash = proxy.constructor(w3.toChecksumAddress(IMP_ADRSS), initializer).transact()
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(tx_receipt.contractAddress)
