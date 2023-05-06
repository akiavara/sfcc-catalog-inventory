#!/usr/bin/env node

const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .usage('Usage: sfcc-catalog-inventory -i [input] -o [output]')
    .option('input', {
        describe    : 'Input File ( Catalog XML )',
        alias       : 'i',
        demandOption: true,
        type        : 'string',
    })
    .option('output', {
        describe    : 'Output File ( Generated XML )',
        alias       : 'o',
        demandOption: false,
        type        : 'string',
        default     : 'inventory'
    })
    .option('id', {
        describe    : 'The ID of the generated inventory',
        demandOption: false,
        type        : 'string'
    })
    .option('description', {
        describe    : 'The description for the generated inventory',
        alias       : 'd',
        demandOption: false,
        type        : 'string',
        default     : ''
    })
    .option('default-in-stock', {
        describe    : 'The default-in-stock value for the generated inventory',
        alias       : 's',
        demandOption: false,
        type        : 'boolean',
        default     : false
    })
    .option('min-stock', {
        describe    : 'The minimum stock amount to be generated for a product',
        alias       : 'm',
        demandOption: false,
        type        : 'number',
        default     : 1
    })
    .option('max-stock', {
        describe    : 'The maximum stock amount to be generated for a product',
        alias       : 'x',
        demandOption: false,
        type        : 'number',
        default     : 100000
    })
    .example('sfcc-catalog-inventory -i catalog.xml', 'Basic Example')
    .example('sfcc-catalog-inventory -i catalog.xml --id="test-inventory" -m 1000', 'Specific ID and min-stock')
    .help()
    .version()
    .argv;

require(path.join(__dirname, '../lib/index.js'))(argv);
