FROM python:3.9.1

RUN mkdir -p /uwt
WORKDIR /uwt

COPY ./requirements.txt /uwt/
COPY ./requirements-test.txt /uwt/
COPY ./Makefile  /uwt/
RUN make bootstrap

COPY ./ /uwt/