# eslint-plugin-fda

This plugin provides a rules for correct using FDA

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-fda`:

```
$ npm install eslint-plugin-fda --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-fda` globally.

## Usage

Add `fda` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fda"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fda/no-direct-use-rematch-state": 2
    }
}
```

## Supported Rules

- [no-direct-use-rematch-state](docs/rules/no-direct-use-rematch-state.md): Prohibits direct use of the state. Works with rematch.





