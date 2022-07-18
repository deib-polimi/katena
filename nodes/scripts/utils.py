from typing import Any
import re

from web3 import Web3

def parse_parameters(signature, values, addresses):
    params = []        

    print(f'signature {signature}')
    for input in signature:
        print(f'values: {values}')
        print(f'addresses: {addresses}')
        print(f'params: {params}')
        if 'tuple' in input['type']:
            print('a')
            tuple_param = input['components']
            param = parse_tuple(tuple_param, values, addresses)
            params.append(param)
        elif 'address[]' in input['type']:
            print(f'b {input} {values} {addresses}')
            if "EMPTY_LIST" == values[0]:
                print('h')
                values[0] = []
                params.append([])
                values.pop(0)
        elif 'address' in input['type']:
            print('z')

            if addresses:
                params.append(Web3.toChecksumAddress(addresses[0]))
                addresses.pop(0)
            elif values and values[0].startswith('0x'):
                params.append(Web3.toChecksumAddress(values[0]))
                values.pop(0)
            else:
                pass

        else:
            print('c')
            try:
                params.append(convert(input['type'], values[0]))
                values.pop(0)
            except IndexError:
                pass
    
    return params

def parse_tuple(params, values, addresses):
    t = []

    for p in params:
        if 'tuple' in p['type'] and p['name'] != 'value':
            print('d')
            new_t = parse_tuple(p['components'], values, addresses)
            t.append(new_t)
        elif 'address' in p['type']:
            print('e')
            try:
                t.append(Web3.toChecksumAddress(addresses[0]))
                addresses.pop(0)
            except IndexError:
                pass
        else:
            print('f')
            try:
                t.append(convert(p['type'], values[0]))
                values.pop(0)
            except IndexError:
                pass

    return t

def convert(data_type: str, value: str) -> Any:
    if value.startswith('0x'):
        print('1')
        return value
    if "int" in data_type or "fixed" in data_type or re.findall(r'[\d]+e[\d]+', value) or re.findall(r'[\d]+.[\d]+e[\d]+', value):
        print('2')
        value = value.replace('+', '')
        return int(float(value))
    elif data_type == "bool":
        print('3')
        return bool(value)
    elif "bytes" in data_type:
        print('4')
        return value.encode()
    else:
        print('5')
        return value
