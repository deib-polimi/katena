FROM ubuntu:20.04

WORKDIR /xopera

RUN apt update
RUN apt install -y python3.8 python3-venv python3-wheel python-wheel-common python3-pip
RUN pip install opera

ENTRYPOINT ["/bin/bash"]