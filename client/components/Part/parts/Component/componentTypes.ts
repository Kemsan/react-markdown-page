// -- TYPING
import { ComponentData } from 'components/Part/Part'

export interface SingleComponent {
  type: string
  component: string
  attrs: object
  items: ComponentData[]
}
