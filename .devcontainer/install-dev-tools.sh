#!/usr/bin/env bash

yum install -y epel-release
yum install -y zip unzip passwd sudo which file wget git

curl -sL https://rpm.nodesource.com/setup_14.x | bash -
yum install -y nodejs

