from web3 import Web3, HTTPProvider, contract
import argparse
import json
import os 
CONTRACTS_DIR =  "."

parser = argparse.ArgumentParser()
parser.add_argument('--network', type=str, default='localhost:8545',
                    help='network to deploy the smart contract. Can be either a url or a host:port. Default communication is through HTTPS so https:// is omitted.')
parser.add_argument('--privateKey', type=str, default="0x6e07fcae8a6a51aa356caf0c40636e8cc35e558ebf449946897f09b910783803")
parser.add_argument('--implementationAddress', type=str, default="0xfC84d41C2b702Dc8A6726C1F96Eb3bEffb9f1A37")
parser.add_argument('--implementationAddress2', type=str, default="0x4Cc9a9f333B921c1d76969B2b8a96D74c03c8A6E")
parser.add_argument('--proxyAddress1', type=str, default="0x718D4BFeE6767C6ed170d49689Cd92fDf2051275")
parser.add_argument('--proxyAddress2', type=str, default="0x26aA68823A4e5215Ab7638D82C99b28C4CABDF7d")
parser.add_argument('--proxyAddress3', type=str, default="0xc462c42bB6070C848EA83940A2A7a440dC4f7542")
parser.add_argument('--proxyAddress4', type=str, default="0x4ade434663f599E6e996923Ca23639CC1F453Da5")
parser.add_argument('--upgradableBeaconAddress', type=str, default="0x9065d8488f425EDa56f19dffE0619a9E6E584576")

parser.add_argument('--implAbi', type=str, default="Implementation2")
parser.add_argument('--proxyAbi', type=str, default="BeaconProxy")
parser.add_argument('--upgradableProxyAbi', type=str, default="UpgradeableBeacon")

args = parser.parse_args()

w3 = Web3(Web3.HTTPProvider(f'http://{args.network}', request_kwargs={'verify': False}))
signer = w3.eth.account.from_key(args.privateKey.upper())
w3.eth.default_account = w3.toChecksumAddress(signer.address)

with open(f'{CONTRACTS_DIR}/{args.implAbi}.json') as f:
    imp_contract_json = json.load(f)
IMP_ABI = imp_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.proxyAbi}.json') as f:
    proxy_contract_json = json.load(f)
PROXY_ABI = proxy_contract_json['abi']

with open(f'{CONTRACTS_DIR}/{args.upgradableProxyAbi}.json') as f:
    upgradable_proxy_contract_json = json.load(f)
UPGRADABLE_BEACON_ABI = upgradable_proxy_contract_json['abi']

# GET CONTRACTS AND THEIR ADDRESS
imp_address = w3.toChecksumAddress(args.implementationAddress)
implementation = w3.eth.contract(address=imp_address,abi=IMP_ABI)

imp_address2 = w3.toChecksumAddress(args.implementationAddress2)
implementation2 = w3.eth.contract(address=imp_address2,abi=IMP_ABI)

proxy_add1 = w3.toChecksumAddress(args.proxyAddress1)
proxy_add2 = w3.toChecksumAddress(args.proxyAddress2)
proxy_add3 = w3.toChecksumAddress(args.proxyAddress3)
proxy_add4 = w3.toChecksumAddress(args.proxyAddress4)
proxy1 = w3.eth.contract(address=proxy_add1,abi=IMP_ABI)
proxy2 = w3.eth.contract(address=proxy_add2,abi=IMP_ABI)
proxy3 = w3.eth.contract(address=proxy_add3,abi=IMP_ABI)
proxy4 = w3.eth.contract(address=proxy_add4,abi=IMP_ABI)

upgradable_address = w3.toChecksumAddress(args.upgradableBeaconAddress)
upgradable = w3.eth.contract(address=upgradable_address,abi=UPGRADABLE_BEACON_ABI)
print("\n\n\n")
print("..::CONTRACT ADDRESSES::..")
print("implementation1 ", args.implementationAddress)
print("implementation2 ", args.implementationAddress2)
print("proxy1 ", args.proxyAddress1)
print("proxy2 ", args.proxyAddress2)
print("proxy3 ", args.proxyAddress3)
print("proxy4 ", args.proxyAddress4)
print("upgradable beacon ", args.upgradableBeaconAddress)

print("\n")


print("..::IMPLEMENTATION VERSIONS::..")
print("proxy1 getContractVersion()", proxy1.functions.getContractVersion().call())
print("proxy2 getContractVersion()", proxy2.functions.getContractVersion().call())
print("proxy3 getContractVersion()", proxy3.functions.getContractVersion().call())
print("proxy3 getContractVersion()", proxy3.functions.getContractVersion().call())
print("upgadableBeacon calls imp", upgradable.functions.implementation().call())
print("\n")
#w3.eth.sendTransaction({'to': upgradable_address,'data':upgradable.encodeABI(fn_name="upgradeTo", args=[imp_address])})

# GET LOGIC VALUES AND ADDRS
print("..::TEST VERSION 1::..")

print("proxy1 getCount()",proxy1.functions.getCount().call())
print("proxy2 getCount()",proxy2.functions.getCount().call())
print("proxy3 getCount()",proxy3.functions.getCount().call())
print("proxy4 getCount()",proxy4.functions.getCount().call())

print("\n proxy1 add(5)")
proxy1.functions.add(5).transact()
print("proxy1 getCount()",proxy1.functions.getCount().call())

print("proxy2 add(10)")
proxy2.functions.add(10).transact()
print("proxy2 getCount()",proxy2.functions.getCount().call())

print("proxy1 substract(3)")
try:
    proxy1.functions.substract(3).transact()
    print("proxy1 getCount()",proxy1.functions.getCount().call())
except:
    print("proxy1 ERROR: function substract not found in this version")
    print("proxy1 getCount()",proxy1.functions.getCount().call())

print("\n")
print("proxy1 getCount()",proxy1.functions.getCount().call())
print("proxy2 getCount()",proxy2.functions.getCount().call())
print("proxy3 getCount()",proxy3.functions.getCount().call(),"no operations done")
print("proxy4 getCount()",proxy4.functions.getCount().call(),"no operations done")
print("\n")


print("..::UPDATE BEACON::..")
w3.eth.sendTransaction({'to': upgradable_address,'data':upgradable.encodeABI(fn_name="upgradeTo", args=[imp_address2])})
print("beacon updated succesfully \n")

print("..::IMPLEMENTATION VERSIONS::..")
print("proxy1 getContractVersion()", proxy1.functions.getContractVersion().call())
print("proxy2 getContractVersion()", proxy2.functions.getContractVersion().call())
print("proxy3 getContractVersion()", proxy3.functions.getContractVersion().call())
print("proxy3 getContractVersion()", proxy3.functions.getContractVersion().call())
print("upgadableBeacon calls imp", upgradable.functions.implementation().call())
print("\n")

print("..::TEST VERSION 2::..")

print("proxy1 getCount()",proxy1.functions.getCount().call())
print("proxy2 getCount()",proxy2.functions.getCount().call())
print("proxy3 getCount()",proxy3.functions.getCount().call())
print("proxy4 getCount()",proxy4.functions.getCount().call())

print("\n proxy1 add(20)")
proxy1.functions.add(20).transact()
print("proxy1 getCount()",proxy1.functions.getCount().call())

print("proxy3 add(90)")
proxy3.functions.add(90).transact()
print("proxy3 getCount()",proxy3.functions.getCount().call())

print("proxy1 substract(3)")
try:
    proxy1.functions.substract(3).transact()
    print("proxy1 getCount()",proxy1.functions.getCount().call())
except:
    print("proxy1 ERROR: funciton substract not found in this version")
    print("proxy1 getCount()",proxy1.functions.getCount().call())

print("proxy3 substract(40)")
try:
    proxy3.functions.substract(49).transact()
    print("proxy3 getCount()",proxy3.functions.getCount().call())
except:
    print("proxy3 ERROR: funciton substract not found in this version")
    print("proxy3 getCount()",proxy3.functions.getCount().call())

print("\n")
print("proxy1 getCount()",proxy1.functions.getCount().call())
print("proxy2 getCount()",proxy2.functions.getCount().call())
print("proxy3 getCount()",proxy3.functions.getCount().call())
print("proxy4 getCount()",proxy4.functions.getCount().call(),"no operations done")