#!/bin/bash

# Set up term colors
blue='\033[1;36m'
green='\033[1;32m'
red='\033[0;31m'
white='\033[1;37m'
yellow='\033[1;33m'
NC='\033[0m' # No Color

# Find out where we launched from.
echo -e "${white}Installing al_ui_template Workspace.${NC}"
START_DIR=`pwd`

# Iterate up the directory structure until we find the root of the al_ui_template repo that we are being executed within
while [[ $PWD != '/' && ! ( -f "$PWD/package.json" && -f "$PWD/bower.json" && "$PWD/karma.conf.js" ) ]]; do
    if [[ -d .git && -f .git/aluitemplate-link ]]
    then
        cd $(<.git/aluitemplate-link)
    else
        cd ..
    fi
done

if [ $PWD = '/' ]
then
    echo "The root of the current al_ui_template repository could not be found: \033[1;31mABORTING\033[0m (make sure you run npm hookmeup)"
    echo "Evaluated from this path: $WHERE_AM_I"
    exit 1
fi

if [ ! -f package.json ]
then
    echo "The root of your al_ui_template repository does not actually appear to be an al_ui_template repository: \033[1;31mABORTING\033[0m"
    echo "Using al_ui_template root $PWD derived from origin path $WHERE_AM_I"
    exit 1
fi

ALUITEMPLATE_DIR=$PWD

BREW=`which brew`
if [ -z $BREW ]
    then
        echo -e "${red}Homebrew not found, can not continue.${NC}"
        exit 1
    else
        echo -e "${blue}Found Homebrew at $BREW${NC}"
fi

NODE=`which node`
if [ -z $NODE ]
    then
        echo -e "${yellow}NodeJS not found, Installing.${NC}"
        brew install node
    else
        echo -e "${blue}Found NodeJS at $NODE${NC}"
fi

# Remove any existing modules, this may be a reinstall.
echo -e "${yellow}Removing legacy node modules.${NC}"
cd $ALUITEMPLATE_DIR
rm -Rf ~/.npm
rm -Rf node_modules

# Install base UI evelopment environment requires.
echo -e "${white}Installing UI Dependencies.${NC}"
cd $ALUITEMPLATE_DIR
npm install -g grunt-cli
npm install -g n
npm install -g bower
bower install

# Up one level, to checkout additional repositories.
cd ..
CHECKOUT_DIR=`pwd`

# Run npm install to get final dependencies and execute postinstall scripts.
echo -e "${white}Installing NPM dependencies.${NC}"
cd $ALUITEMPLATE_DIR
npm install

# Execute copying of githooks to all checkouts.
echo -e "${yellow}Adding GIT pre-push hooks to all projects.${NC}"
cd $ALUITEMPLATE_DIR
npm run hookmeup

# Install webdriver-manager standalone
cd $ALUITEMPLATE_DIR
node_modules/protractor/bin/webdriver-manager update --standalone

# Return to where the user executed this script from.
cd $START_DIR
echo -e "${green}al_ui_template Workspace Installation Complete!${NC}"
exit 0
