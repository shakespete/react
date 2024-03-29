import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import {
  findAllInRenderedTree,
  isCompositeComponentWithType,
} from 'react-dom/test-utils'
import {Switch} from '../src/switch'

const findSwitchInstances = (rootInstance: React.Component<any, {}, any>) =>
  findAllInRenderedTree(rootInstance, c =>
    isCompositeComponentWithType(c, Switch),
  )

function validateSwitchInstance(switchInstance?: React.ReactInstance) {
  alfredTip(
    () => expect(switchInstance).toBeDefined(),
    `Unable to find the Switch component. Make sure you're rendering that!`,
  )
  alfredTip(
    () =>
      // TODO: fix this 🤷‍♂️
      // @ts-expect-error not sure what type the switchInstance really is...
      expect(switchInstance?.props).toMatchObject({
        on: expect.any(Boolean),
        onClick: expect.any(Function),
        // it can also have aria-pressed...
      }),
    'The Switch component is not being passed the right props.',
  )
}

// this only exists so we can search for an instance of the Switch
// and make some assertions to give more helpful error messages.
class Root extends React.Component {
  render() {
    return this.props.children
  }
}

function renderToggle(ui: React.ReactElement) {
  let rootInstance: Root | null = null
  let rootRef: React.LegacyRef<Root> = instance => (rootInstance = instance)
  const utils = render(<Root ref={rootRef}>{ui}</Root>)
  const switchInstance = findSwitchInstances(rootInstance!)[0]
  validateSwitchInstance(switchInstance)

  return {
    toggle: () => userEvent.click(utils.getByTestId('toggle-button')),
    getToggle: () => utils.getByTestId('toggle-button'),
    ...utils,
  }
}

export * from '@testing-library/react'
export {render, renderToggle, userEvent}
