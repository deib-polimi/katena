FROM --platform=linux/amd64 ubuntu:20.04

WORKDIR /

ENV PATH "$PATH:/new/path"

RUN apt update
RUN apt install -y python3.8 python3-pip curl tar nano vim jq
RUN ln -s /usr/bin/python3 /usr/bin/python
RUN curl https://nodejs.org/dist/v14.15.4/node-v14.15.4-linux-x64.tar.xz -O
# Extract & install
RUN tar -xf node-v14.15.4-linux-x64.tar.xz
RUN ln -s /node-v14.15.4-linux-x64/bin/node /usr/local/bin/node
RUN ln -s /node-v14.15.4-linux-x64/bin/npm /usr/local/bin/npm
RUN ln -s /node-v14.15.4-linux-x64/bin/npx /usr/local/bin/npx

RUN npm install -g ganache-cli
RUN npm config set user 0


WORKDIR /katena
ADD . /katena/

RUN pip install -r ./requirements.txt

# to avoid: /bin/bash^M: bad interpreter:
# when creating scripts in Windows env and then porting over to run on a Unix environment.
RUN sed -i -e 's/\r$//' *.sh