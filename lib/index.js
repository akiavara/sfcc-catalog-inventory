const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');
const xml2js = require('xml2js');
const XmlStream = require('xml-stream');

module.exports = async (options) => {
    // Start CLI Spinner
    const spinner = ora(`${chalk.bold('Processing ...')} [Ctrl-C to Cancel])`).start();

    // Update Spinner
    spinner.text = chalk.bold(`Processing ${options.input} ...`).concat(' [Ctrl-C to Cancel]');
    spinner.render();

    // Create Default Inventory List ID
    let listId;

    // Will contains output inventory data
    let inventories;

    const stream = fs.createReadStream(options.input);
    const xml = new XmlStream(stream);

    xml.on('startElement: catalog', function (catalog) {
        if (options.id) {
            listId = options.id;
        } else if (
            catalog &&
            typeof catalog['$'] !== 'undefined' &&
            typeof catalog['$']['catalog-id'] !== 'undefined'
        ) {
            listId = `${catalog['$']['catalog-id']}-inventory`;
        } else {
            listId = 'inventory';
        }

        // Create Inventory Object
        inventories = {
            $: {
                xmlns: 'http://www.demandware.com/xml/impex/inventory/2007-05-31',
            },
            'inventory-list': {
                header: {
                    $: {
                        'list-id': listId,
                    },
                    'default-instock': options.defaultInStock,
                    description      : options.description,
                },
                'records': {
                    'record': [],
                },
            },
        };
    });

    xml.on('endElement: product', function (product) {
        // Check that we have a Product with an ID
        if (product && typeof product['$'] !== 'undefined' && typeof product['$']['product-id'] !== 'undefined') {
            // Save Product to Inventory List
            inventories['inventory-list'].records.record.push({
                $: {
                    'product-id': product['$']['product-id'],
                },
                allocation: {
                    _: Math.floor(Math.random() * (options.maxStock - options.minStock + 1) + options.minStock)
                },
            });
        }

    });

    xml.on('error', function (err) {
        spinner.text = `Error: ${err}`;
        spinner.fail();
    });

    xml.on('end', function () {
        // Create XML Builder
        const builder = new xml2js.Builder({
            mergeAttrs: true,
            rootName  : 'inventory',
            xmldec    : {
                version : '1.0',
                encoding: 'UTF-8',
            },
        });

        // Build XML String from Object
        const inventoryXML = builder.buildObject(inventories);

        let outputFile;

        // Check if Output Filename Defined
        if (options.output) {
            // Not sure if user has XML added as extension, so let's make sure
            outputFile = `${options.output.replace(/\.xml$/, '')}.xml`;
        } else {
            outputFile = `${listId}.xml`;
        }

        // Write XML Output to File
        fs.writeFile(outputFile, inventoryXML, (writeErr) => {
            if (writeErr) {
                spinner.text = `Error: ${writeErr}`;
                spinner.fail();
            } else {
                spinner.text = chalk.bold('Processing Complete').concat(` ( Created: ${outputFile} )`);
                spinner.succeed();
            }

            // Terminate Process
            process.exit();
        });
    });
};
