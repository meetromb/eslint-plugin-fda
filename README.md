# eslint-plugin-feature-driven-architecture

This plugin provides a rules for correct using FDA

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-feature-driven-architecture`:

```
$ npm install eslint-plugin-feature-driven-architecture --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-feature-driven-architecture` globally.

## Usage

Add `feature-driven-architecture` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "feature-driven-architecture"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "feature-driven-architecture/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





