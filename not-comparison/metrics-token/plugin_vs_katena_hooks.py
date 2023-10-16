import argparse
import re
import sys
import glob


def tokens(code):
    return re.findall(r'\w+', code)

def get_tokens_in_file(filename: str) -> int:
    with open(filename) as f:
        file = f.read().replace('\n', ' ')
        return len(tokens(file))

def get_YAML_in_directory(dir_path: str) -> list:
    return glob.glob(f'{dir_path}/hooks.yaml')

def get_not_original_deploy(dir_path: str) -> list:
    return glob.glob(f'{dir_path}/deploy.ts') 

def get_original_deploy(dir_path: str) -> list:
    return glob.glob(f'{dir_path}/originalDeploy.ts') 

parser = argparse.ArgumentParser()
parser.add_argument('--directory', default='', type=str)
args = parser.parse_args()

directory = "hooks"
yaml_files = get_YAML_in_directory(directory)
orignal_ts_files = get_not_original_deploy(directory)
not_original_ts_files = get_original_deploy(directory)


yaml_tokens = sum([get_tokens_in_file(f) for f in yaml_files])
orignal_ts_tokens = sum([get_tokens_in_file(f) for f in orignal_ts_files])
not_original_ts_tokens = sum([get_tokens_in_file(f) for f in not_original_ts_files])
print(f'YAML: {yaml_tokens}')
print(f'ORIGINAL DEPLOY: {orignal_ts_tokens}')
print(f'PLUGIN DEPLOY: {not_original_ts_tokens}')
