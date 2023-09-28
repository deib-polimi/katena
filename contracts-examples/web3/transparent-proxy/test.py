from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os 
CONTRACTS_DIR =  "."

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, default="0x6e07fcae8a6a51aa356caf0c40636e8cc35e558ebf449946897f09b910783803")
parser.add_argument('--implementationAddress', type=str, default="0x66FA8AA285715577061c0f514343Ec791De26fC8")
parser.add_argument('--implementationAddress2', type=str, default="0x1A4411980b64487282b6B721A22E8FF921bb0037")
parser.add_argument('--proxyAdminAddress', type=str, default="0xbB0B9Ee0aDEd0139a150500dc1888B14824080Ce")
parser.add_argument('--transparentProxyAddress', type=str, default="0x9cB2cfe1b6De417839A3B0341443410Af3F50D2B")

parser.add_argument('--implAbi', type=str, default="Implementation2")
parser.add_argument('--proxyAdminAbi', type=str, default="ProxyAdmin")
parser.add_argument('--transparentProxyAbi', type=str, default="TransparentUpgradeableProxy")

args = parser.parse_args()

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

with open(f'{CONTRACTS_DIR}/{args.implAbi}.json') as f:
    imp_contract_json = json.load(f)
IMP_ABI = imp_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.proxyAdminAbi}.json') as f:
    proxy_adm_contract_json = json.load(f)
PROXYADM_ABI = proxy_adm_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.transparentProxyAbi}.json') as f:
    trans_proxy_contract_json = json.load(f)
TRANSPARENT_PROXY_ABI = trans_proxy_contract_json['abi']

# GET CONTRACTS AND THEIR ADDRESS
imp_address = w3.toChecksumAddress(args.implementationAddress)
implementation = w3.eth.contract(address=imp_address,abi=IMP_ABI)

imp_address2 = w3.toChecksumAddress(args.implementationAddress2)
implementation2 = w3.eth.contract(address=imp_address2,abi=IMP_ABI)

proxy_admin_addrs = w3.toChecksumAddress(args.proxyAdminAddress)
proxy_adm = w3.eth.contract(address=proxy_admin_addrs,abi=PROXYADM_ABI)

trans_proxy_addrs = w3.toChecksumAddress(args.transparentProxyAddress)
trans_proxy = w3.eth.contract(address=trans_proxy_addrs,abi=IMP_ABI)

print("\n\n\n")
print("..::CONTRACT ADDRESSES::..")
print("implementation1 ", args.implementationAddress)
print("implementation2 ", args.implementationAddress2)
print("proxy_admin ", args.proxyAdminAddress)
print("transparent_proxy ", args.transparentProxyAddress)

print("\n")

print("..::IMPLEMENTATION VERSIONS::..")
print("proxy getContractVersion()", trans_proxy.functions.getContractVersion().call())
print("\n")

print("..::ADDRESS::..")
owner = args.proxyAdminAddress
not_owner = w3.eth.default_account
print("admin", owner)
print("not admin", not_owner)
print("\n")

###########
#         #
#  TESTS  #
#         #
###########

print("..::PUBLIC CALLS::..  (any caller)")

print("- LOGIC FUNCTIONS") #SHOULD NOT FALL IN EXCEPT
print("proxy  getCount()", trans_proxy.functions.getCount().call())
print("proxy  add(3)")
trans_proxy.functions.add(3).transact()
print("proxy  getCount()", trans_proxy.functions.getCount().call())
print("proxy  substract(15)", end=" ")
try:
   trans_proxy.functions.substract(15).call()
except:
   print("ERROR func not founf in this version")
print("proxy  getCount()", trans_proxy.functions.getCount().call())

print("- ADM FUNCTIONS") #ADMIN CALLS SHOULD FALL IN EXCEPT
msg = "ERROR  This is an admin function"
print("proxy getProxyImplementation()", end=" ")
try:
   trans_proxy.functions.getProxyImplementation(trans_proxy).call()
except:
   print(msg)
print("proxy getProxyAdmin()", end="          ")
try:
   trans_proxy.functions.getProxyAdmin(trans_proxy).call()
except:
   print(msg)
print("proxy upgrade()", end="                ")
try:
   trans_proxy.functions.upgrade(trans_proxy, implementation2).transact()
except:
   print(msg)

#changeProxyAdmin(trans_proxy, newAdmin)

print("\n\n..::ADMIN CALLS::..  (called by proxy adm)")
print("- LOGIC FUNCTIONS") #SHOULD FALL IN EXCEPT
print("proxyAdmin  getCount()", end=" ")
try:
   proxy_adm.functions.getCount().call()
except:
   print("ERROR: This is a logic called by adm")

print("- ADM FUNCTIONS") #ADMIN CALLS SHOULD NOT FALL IN EXCEPT
print("admProxy getProxyImplementation()", proxy_adm.functions.getProxyImplementation(trans_proxy_addrs).call())
print("admProxy getProxyAdmin()", proxy_adm.functions.getProxyAdmin(trans_proxy_addrs).call())
print("admProxy upgrade()", proxy_adm.functions.upgrade(trans_proxy_addrs, imp_address2).transact())
print("implementation upgraded successfully...")
print("\n\nTEST UPGRADE:")
print("proxy getContractVersion()", trans_proxy.functions.getContractVersion().call())
print("proxy  getCount()", trans_proxy.functions.getCount().call())
print("proxy  substract(10)")
trans_proxy.functions.substract(10).transact()
print("proxy  getCount()", trans_proxy.functions.getCount().call())


