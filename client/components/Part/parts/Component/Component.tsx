// -- CORE
import React from 'react'
// -- COMPONENTS
import components from './components'
// -- TYPES
import { SingleComponent } from './componentTypes'

// -- COMPONENT
const Component: React.FunctionComponent<SingleComponent> = ({ component, ...props }: SingleComponent) => {
  const Component = components[component] || null

  if (!Component) {
    return null
  }

  return (<Component {...props} />)
}

export default Component
