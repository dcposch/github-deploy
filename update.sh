#!/bin/bash

# This script runs every time you push to a given branch on Github
# (For example, I've used for projects where I push to the "production" branch to auto deploy.)
# The output is emailed to you.

# Die on any error
set -e

echo "Fetching new sources..."
# cd <YOUR REPO FOLDER HERE>
git fetch
git reset --hard origin/production

echo "Compiling..."
# YOUR CODE HERE

# Makefile example:
# make clean test

# Java+Gradle example:
# ./gradlew clean test
# ./gradlew fatJar

echo "Taking down the old server..."
# YOUR CODE HERE

# Java example:
# killall java || echo "Server wasn't running!"

echo "Booting the new server..."
# YOUR CODE HERE

# Java+Gradle example:
# java -jar ./build/libs/my-jar.jar & 

echo "Waiting for it to boot..."
sleep 5
disown
# tail -10 <YOUR APPLICATION LOG> || echo "No log file! Probably didn't boot"

echo "Done"
