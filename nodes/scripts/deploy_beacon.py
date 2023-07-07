from web3 import Web3, HTTPProvider
import argparse
import json

from utils import parse_parameters

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, help='private key to sign transactions')
parser.add_argument('--contractAbi', type=str, help='ABI of the smart contract to deploy')
parser.add_argument('--bytecode', type=str, help='contract bytecode')

parser.add_argument('--beaconAddress', type=str, help='address of the beacon')
parser.add_argument('--proxyCount', type=int, help='number of proxies to add to the beacon')

args = parser.parse_args()

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))

with open(f'contracts/{args.contractAbi}.json') as f:
    proxy_contract_json = json.load(f)

PROXY_ABI = proxy_contract_json['abi']
PROXY_BYTECODE = args.bytecode

# BUILD BEACON AND CONTRACT PROXIES
# TO SIGN ALL THE TRANSACTIONS
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

# DEPLOY THE BEACON CONTRACT
count = args.proxyCount
for i in range(0,count):
    # Deploy proxy contracts
    proxy = w3.eth.contract(abi=PROXY_ABI, bytecode=PROXY_BYTECODE)
    tx_hash = proxy.constructor(w3.toChecksumAddress(args.beaconAddress), b'').transact()
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print(f'{tx_receipt.contractAddress}')

# # Update the beacon value through the first proxy contract
# proxy_instance_1 = w3.eth.contract(address=proxy_contract_address_1, abi=proxy_contract_abi)
# update_transaction_1 = proxy_instance_1.functions.updateBeaconValue(newValue).buildTransaction({
#     'from': YOUR_ADDRESS,
#     'gas': YOUR_GAS_LIMIT,
# })
# signed_update_transaction_1 = w3.eth.account.signTransaction(update_transaction_1, YOUR_PRIVATE_KEY)
# tx_hash_update_1 = w3.eth.sendRawTransaction(signed_update_transaction_1.rawTransaction)
# tx_receipt_update_1 = w3.eth.waitForTransactionReceipt(tx_hash_update_1)

# # Update the beacon value through the second proxy contract
# proxy_instance_2 = w3.eth.contract(address=proxy_contract_address_2, abi=proxy_contract_abi)
# update_transaction_2 = proxy_instance_2.functions.updateBeaconValue(newValue).buildTransaction({
#     'from': YOUR_ADDRESS,
#     'gas': YOUR_GAS_LIMIT,
# })
# signed_update_transaction_2 = w3.eth.account.signTransaction(update_transaction_2, YOUR_PRIVATE_KEY)
# tx_hash_update_2 = w3.eth.sendRawTransaction(signed_update_transaction
