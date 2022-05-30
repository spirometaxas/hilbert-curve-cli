#!/usr/bin/env node
const hilbert = require('./index.js');

const printUsage = function() {
    console.log('\nUsage:\n' + '  $ hilbert-curve-cli <n>\n');
}

if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    if (params[0] && !isNaN(params[0]) && parseInt(params[0]) >= 1) {
        var n = parseInt(params[0]);
        if (n !== undefined) {
            console.log(hilbert.create(n));
        }
    } else {
        console.log('\n<n> should be a number greater than or equal to 1');
        printUsage();
    }
} else {
    printUsage();
}