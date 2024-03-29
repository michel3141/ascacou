SHELL=/bin/bash
WWW ?= ~/www/appli/ascacou2
yes ?= n

#TARGET=$$(find $$(sed s/^/src\\// src/build ) -type f)
TARGET=./
#BUILD_OPT=--outDir ../../ascacou.back/public --base ./ --sourcemap true
#BUILD_OPT=--outDir ../../ascacou.back/public --base ./
#BUILD_OPT=--base ./ --sourcemap true
BUILD_OPT=--base ./
SERVE_OPT=--host 0.0.0.0 --strictPort --port 1234

all: clean build
	@echo $(TARGET)

fast-build: mount
	#npx parcel build --no-scope-hoist --no-optimize $(BUILD_OPT) $(TARGET)

build: mount
	pnpm vite build $(BUILD_OPT) $(TARGET)

pretty:
	pnpm prettier --write --print-width 100 --jsx-single-quote --single-quote --single-attribute-per-line  'src/**/*.js' 'src/**/*.jsx' 'src/**/*.*css'
	pnpm rtk-export src/features/*/*/*.js -w
	pnpm rtk-export src/features/*/*.js -w
	pnpm prettier --write --print-width 100 --jsx-single-quote --single-quote --single-attribute-per-line  'src/**/*.js' 'src/**/*.jsx' 'src/**/*.*css'
	pnpm madge --webpack-config=.madge.aliases --circular src
	pnpm eslint src --ext js,jsx --report-unused-disable-directives --rule 'space-before-function-paren: off' --rule 'indent: off' --rule 'multiline-ternary: off' --max-warnings 0
	pnpm eslint src --ext js,jsx --report-unused-disable-directives --fix --rule 'import/no-absolute-path: off' --max-warnings 0

clean:
	rm -rf .cache dist .parcel-cache/ /tmp/parcel-dist /tmp/parcel-cache

https: #TODO 	pnpm vite --https $(SERVE_OPT) $(TARGET)
	pnpm vite --https $(SERVE_OPT) $(TARGET)

install: clean build
	rsync -Cav$(yes) --del dist/ u50644085@home258443028.1and1-data.host:$(WWW)
	@test -n "$(yes)" && echo -e "utiliser : \n  make install WWW='$(WWW)' yes=\npour faire vraiment l'install dans : $(WWW)" || true
install.lespyjamasrouges.fr: clean build
	rsync -Cav$(yes) --del --checksum dist/ yllj3200@rarmusik.fr:ascacou.lespyjamasrouges.fr
	@test -n "$(yes)" && echo -e "utiliser : \n  make pyjamas.rouges yes=\npour faire vraiment l'install sur lespyjamasrouges.fr" || true

serve: mount
	pnpm vite $(SERVE_OPT) $(TARGET)

mount:
	#mkdir -p src
	#mountpoint src || unionfs -o cow src.top/=RW:src.bottom src && sleep 1

flatten: mount
	#fusermount -u src
	#unionfs src.top:src.bottom src
	#rsync -av --delete --exclude .unionfs-fuse src/ src.bottom
	#sleep 1 && fusermount -u src
	#rm -rf src.top
	#mkdir -p src.top
