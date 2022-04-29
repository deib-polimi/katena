from audioop import add
from typing import Any
import re

from web3 import Web3

def parse_parameters(signature, values, addresses):
    params = []        

    for input in signature:

        if 'tuple' in input['type']:
            tuple_param = input['components']
            param = parse_tuple(tuple_param, values, addresses)
            params.append(param)
        elif 'address' in input['type']:
            params.append(Web3.toChecksumAddress(addresses[0]))
            addresses.pop(0)
        else:
            params.append(convert(input['type'], values[0]))
            values.pop(0)

    return params

def parse_tuple(params, values, addresses):
    t = []

    for p in params:
        if 'tuple' in p['type'] and p['name'] != 'value':
            new_t = parse_tuple(p['components'], values, addresses)
            t.append(new_t)
        elif 'address' in p['type']:
            t.append(Web3.toChecksumAddress(addresses[0]))
            addresses.pop(0)
        else:
            t.append(convert(p['type'], values[0]))
            values.pop(0)

    return t

def convert(data_type: str, value: str) -> Any:
    # if "int" in data_type or "fixed" in data_type:
        # return int(value)
    if "int" in data_type or "fixed" in data_type or re.findall(r'[\d]+e[\d]+', value) or re.findall(r'[\d]+.[\d]+e[\d]+', value):
        value = value.replace('+', '')
        return int(float(value))
    elif data_type == "bool":
        return bool(value)
    elif "bytes" in data_type:
        return value.encode()
    else:
        return value
