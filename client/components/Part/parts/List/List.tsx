// -- CORE
import React from 'react'
import styled from 'styled-components'
// -- COMPONENTS
import Part, { ComponentData } from 'components/Part/Part'
// -- TYPES
import { SinglePart } from '../partTypes'

// -- TYPING
interface ListProps extends SinglePart {
  ordered: boolean,
  items: ComponentData[][]
}

// -- COMPONENT
const List: React.FunctionComponent<ListProps> = ({ ordered, items, ...props }: ListProps) => {
  const Component = ordered ? Ol : Ul

  return (
    <Component {...props}>
      {items.map((item, key) => (<Li key={`list-${key}`}><Part components={item} /></Li>))}
    </Component>
  )
}

// -- UI
const Ol = styled.ol``
const Ul = styled.ul``

const Li = styled.li``

export default List
