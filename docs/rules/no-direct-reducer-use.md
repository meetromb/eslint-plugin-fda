# Prohibits direct use of state (no-direct-use-rematch-state)

This rule aims to prevent the direct use of the feature state. Each feature must have public API methods - in our case these are selectors and actions.

Examples of **incorrect** code for this rule:

```js

const mapStateToProps = ({ featureA }) => ({
  someProp: featureA.someProp
})

const mapDispatchToProps = ({ featureA }) => ({
  someAction: () => featureA.makeSomeAction()
})

```

Examples of **correct** code for this rule:

```js
import { somePropSelector, makeSomeAction } from '@features/featureA'

const mapStateToProps = state => ({
  someProp: somePropSelector(state)
})

const mapDispatchToProps = state => ({
  someAction: () => makeSomeAction(state)
})

```
