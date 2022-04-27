from typing import Any
import re

def parse_parameters(signature, values):
    params = []        

    for input in signature:

        if 'tuple' in input['type']:
            tuple_param = input['components']
            param, removed_elements = parse_tuple(tuple_param, values)
            values = values[removed_elements:]
            # params.append({input['name']: param})
            params.append(param)
        else:
            # params.append(convert(input['type'], values[0]))
            params.append(convert(input['type'], values[0]))
            values.pop(0)

    return params

def parse_tuple(params, values):
    t = []
    removed_elements = 0

    for index, p in enumerate(params):
        if 'tuple' in p['type'] and p['name'] != 'value':
            # recursive call
            new_t, new_removed_elements = parse_tuple(p['components'], values)
            # t[p['name']]= new_t
            # t = t + new_t
            t.append(new_t)
            removed_elements += new_removed_elements
        else:
            # t[p['name']]= convert(p['type'], values[index])
            t.append(convert(p['type'], values[index]))
            # t = t + tuple([convert(p['type'], values[index])])
            removed_elements += 1

    return t, removed_elements

def convert(data_type: str, value: str) -> Any:
    if "int" in data_type or "fixed" in data_type or re.findall(r'[\d]+e[\d]+', value) or re.findall(r'[\d]+.[\d]+e[\d]+', value):
        value = value.replace('+', '')
        return int(float(value))
    elif data_type == "bool":
        return bool(value)
    elif "bytes" in data_type:
        return value.encode()
    else:
        return value
