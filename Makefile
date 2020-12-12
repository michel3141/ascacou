SHELL=/bin/bash
WWW ?= ~/www/appli/test
yes ?= n

#TARGET=$$(find $$(sed s/^/src\\// src/build ) -type f)
TARGET=src/index.html
BUILD_OPT=--public-url ./

all: clean build
	@echo $(TARGET)

fast-build:
	npx parcel build $(BUILD_OPT) $(TARGET)

build: 
	npx parcel build --experimental-scope-hoisting $(BUILD_OPT) $(TARGET)

clean:
		rm -rf .cache dist .parcel-cache/

https:
	morbo -l 'https://*:3000?cert=script/Magic.crt&key=script/Magic.key' script/app

install:
	rsync -Cav$(yes) --del dist/ u50644085@home258443028.1and1-data.host:$(WWW)
	@test -n "$(yes)" && echo -e "utiliser : \n  make install WWW='$(WWW)' yes=\npour faire vraiment l'install dans : $(WWW)" || true
