#!/usr/bin/env bash
scp receiver.html root@178.128.30.234:/var/www/html
scp -r css js res root@178.128.30.234:/var/www/html
