SFCC Catalog Inventory
===

Create Salesforce Commerce Cloud Inventory XML from Catalog XML

Installation
---

You can install this package via NPM:

```bash
npm install -g @akiavara/sfcc-catalog-inventory
```

If you clone this repository you can run the `npm link` command before using this tool. This will allows you to directly run the `sfcc-catalog-inventory` command in your command line directly.

Usage
---

The most common usage will look like this:

```bash
sfcc-catalog-inventory -i /path/to/catalog.xml
```

**FLAGS:**

Name             | Param                | Alias      | Required | Default Value | Definition
-----------------|----------------------|------------|----------|---------------|---------------------
Input            | `--input`            | `-i`       | Yes      |               | Path to SFCC Catalog XML File
Output           | `--output`           | `-o`       | No       | inventory.xml | Output XML file name
ID               | `--id`               |            | No       |               | ID of Inventory ( Defaults to Catalog Name )
Description      | `--description`      | `-d`       | No       |               | Description of Inventory
Default in stock | `--default-in-stock` | `-s`       | No       | false         | Default in stock value of Inventory
Min Stock        | `--min-stock`        | `-m`       | No       | 1             | Minimum stock generated for a product in the Inventory
Max Stock        | `--max-stock `       | `-x`       | No       | 100000        | Maximum stock generated for a product in the Inventory

**EXAMPLES:**

```bash
sfcc-catalog-inventory -i /path/to/catalog.xml
sfcc-catalog-inventory -i /path/to/catalog.xml -o inventory.xml
sfcc-catalog-inventory -i /path/to/catalog.xml -o inventory.xml -s

sfcc-catalog-inventory -i /path/to/catalog.xml --id "test-inventory"
sfcc-catalog-inventory --input /path/to/catalog.xml --id "test-inventory"

sfcc-catalog-inventory -i /path/to/catalog.xml -o /path/to/inventory.xml -d "My great description"
sfcc-catalog-inventory --input /path/to/catalog.xml --output /path/to/inventory.xml --description "My great description"

sfcc-catalog-inventory -i /path/to/catalog.xml -m 100 -x 200
```

Troubleshooting
---

Need help on how to run this tool?  Just run the command without options to see example usage & instruction.

```bash
sfcc-catalog-inventory
```
