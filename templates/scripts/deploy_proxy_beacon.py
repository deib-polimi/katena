from web3 import Web3
import argparse
import json

from utils import CONTRACTS_DIR, parse_parameters

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--abi', type=str, help='ABI of the smart contract to deploy')
parser.add_argument('--beaconAddress', type=str, help='address of the beacon')
parser.add_argument('--implementationAbi', type=str)
parser.add_argument('--implementationAddress', type=str)
parser.add_argument('--proxyCount', type=int, help='number of proxies to add to the beacon')
parser.add_argument('--implementationParams', nargs='*', help='contract input parameters')
parser.add_argument('--params', nargs='*', help='contract input parameters')

args = parser.parse_args()

def call_contructor(params):
    print("call_contructor", params)
    initializer_inputs = [] 
    for function in PROXY_ABI:
        if function['type'] == 'constructor':
            initializer_inputs = function['inputs']
            break

    params = parse_parameters(initializer_inputs, params, [])
    print("call_contructor", params)


    # BUILD BEACON AND CONTRACT PROXIES
    tx_hash = proxy.constructor(*params).transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(tx_receipt.contractAddress)

def call_constructor_and_initializer(params):
    initializer_inputs = [] 
    for function in IMP_ABI:
        if function['name'] == 'initialize':
            initializer_inputs = function['inputs']
            break
    params = parse_parameters(initializer_inputs, params, [])

    # BUILD BEACON AND CONTRACT PROXIES

    initializer = imp.encodeABI(fn_name="initialize", args=params)
    tx_hash = proxy.constructor(w3.toChecksumAddress(BEACON_ADDR), initializer).transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(tx_receipt.contractAddress)


# TO SIGN ALL THE TRANSACTIONS
w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

# DEFINE VARIABLES
BEACON_ADDR =  args.beaconAddress

with open(f'{CONTRACTS_DIR}/{args.abi}.json') as f:
    proxy_contract_json = json.load(f)
PROXY_ABI = proxy_contract_json['abi']
PROXY_BYTECODE = proxy_contract_json['bytecode']

with open(f'{CONTRACTS_DIR}/{args.implementationAbi}.json') as f:
    proxy_contract_json = json.load(f)
IMP_ABI = proxy_contract_json['abi']
IMP_ADRSS = args.implementationAddress


proxy = w3.eth.contract(abi=PROXY_ABI, bytecode=PROXY_BYTECODE)
imp = w3.eth.contract(address=IMP_ADRSS, abi=IMP_ABI)

# the BeaconProxy contract may want to call the 
# implementation initialize functions in many ways
if (len(args.implementationParams) != 0):
    params = args.implementationParams
    try:
        # if the proxy only constructor input is the initialize 
        # call to the implementation
        call_constructor_and_initializer(params)
    except: 
        # in some cases the proxy may just want to
        # call its own constructor and to input the function call of initialize
        # manually
        call_contructor(params)
else:
    # some proxy just call their constructor
    params = args.params
    call_contructor(params)
