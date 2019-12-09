// -- CORE
import React from 'react'
// -- DATA
import parts from './parts'

// -- TYPING
export interface PartProps {
  components: ComponentData[]
}

export interface ComponentData {
  [k: string]: any
  type?: string
  content?: ComponentData[]
}

// -- HELPERS
const renderComponent = (component: ComponentData, idx: number) => {
  const Component = parts[component.type]

  if (component.type === 'inlineCode') {
  }
  if (!Component) {
    if (typeof component.content === 'string') {
      return component.content
    }

    return null
  }

  return (<Component key={component.type + idx} {...component} />)
}

// -- COMPONENT
const Part: React.FunctionComponent<PartProps> = ({ components }: PartProps) => {
  // Drop
  if (!Array.isArray(components)) {
    // Plain text, lowest possible level
    if (typeof components === 'string') {
      return components
    }

    return null
  }

  return (<>{components.map(renderComponent)}</>)
}

export default Part
