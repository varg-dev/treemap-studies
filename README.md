# Survey on Treemap User Studies Dataset Repository

This is the repository for the website https://varg-dev.github.io/treemap-studies.
The goal of this project is to collect, process, and depict data on user studies on the treemap visualization technique.

Thereby, this project relies on community effort.
If you want to participate in the process, feel free to use, validate, fix, or extend the data or the website as well as the other material.

The dataset containing user studies with a range of tags and assesses information is provided as one single file: `studies.json`. Due to the current setup of the website using jekyll, this dataset is stored in the `_data` directory. For validation of the dataset, the `studies.schema.json` can be used.

The repository (expluding the dataset `_data/studies.json`) is published under MIT license.
The dataset `_data/studies.json` is published under CC BY-SA 4.0. For more information, please refer to `LICENSE.md`.

## Use Data on User Studies

The dataset is available as JSON and can be viewed directly with a text viewer of your choice.
However, you may find this dataset too large to be viewed as direct text. We suggest you use the derived website at https://varg-dev.github.io/treemap-studies to get an overview with interactive filtering of the contents.

When using this overview and/or the assessed data from the dataset in your publications, please refer to the original publication:

* Carolin Fiedler, Willy Scheibel, Daniel Limberger, Matthias Trapp, and Jürgen Döllner: "Survey on User Studies on the Effectiveness of Treemaps" in Proc. 13th International Symposium on Visual Information Communication and Interaction (VINCI 2020), pp. 2:1-10. DOI: [10.1145/3430036.3430054](https://doi.org/10.1145/3430036.3430054). ACM

When using the information of this project for other purposes as scientific or academic publications, please refer to this project at https://github.com/varg-dev/treemap-studies.

## Validate Data on User Studies

To validate the dataset, you can use the JSON schema file `studies.schema.yml` in the `_data` directory and general linter for JSON. Please report validation errors as Issues and direct fixes using Pull Requests.

### JSON Linter

Example linter using Ubuntu and `jsonlint`:

```bash
jsonlint-php _data/studies.json
```

Expected output is:

```bash
Valid JSON (_data/studies.json)
```

### JSON Schema Validation

Example validation using Python `jsonschema`:

```bash
jsonschema -i _data/studies.json _data/studies.schema.json
```

Expected output is *empty*.

## Fix and Update Data on User Studies

If you want to participate in maintaining this dataset, please open Pull Requests to fix specific problems or extend the dataset (please add yourself to the list of collaborators on this dataset at `_data/studies.collaborators.txt` as well). General problems should be discussed and handled using Issues. General questions can be asked in the Discussions.

## Fix and Update the Website or other Material from this Repository

The website is build using jekyll. Within the jekyll build script, the dataset `studies.json` in the directory `_data` is parsed and converted into plain HTML. The template uses Bootstrap. The file `tableStructure.yml` in the `_data` directory configures the large table by defining headers and JSON paths from where to fetch the data from the dataset.

### Website Setup

Install ruby for your OS.

```
gem install bundle
bundle install
```

### View Site locally
This will build the site just like github does since `github-pages` is installed.
```
bundle exec jekyll serve
```
