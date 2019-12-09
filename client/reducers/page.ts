// -- HELPERS
import api from 'helpers/api'
import { Dispatch, AnyAction, Reducer } from 'redux'

// -- INTERFACE
export interface ReducerAction {
  type: string
  payload?: {
    [k: string]: any
  }
}

export interface PageState {
  loading: boolean
  pages: object
  options: object
}

export interface PageStateOptions {
  [k: string]: any
  title: string
}

// -- DATA
const initialState: PageState = {
  loading: false,
  pages: {},
  options: {
    title: null
  }
}

// -- ACTIONS
const FETCHING_PAGE = '@@page/FETCHING_PAGE'
const RECEIVE_PAGE = '@@page/RECEIVE_PAGE'
const RECEIVE_OPTIONS = '@@page/RECEIVE_OPTIONS'

// -- ACTION CREATORS

/**
 * Sets data if page is loading
 *
 * @param loading Loading state
 */
export const fetchingPage = (loading: boolean): AnyAction => ({
  type: FETCHING_PAGE,
  payload: {
    loading
  }
})

/**
 * Setups data for given name and components list
 *
 * @param page Page name
 * @param components Components list
 */
export const receivePage = (page: string, components: object): AnyAction => ({
  type: RECEIVE_PAGE,
  payload: {
    page,
    components
  }
})

/**
 * Fetches page content for given name
 *
 * @param page Page name
 */
export const fetchPage = (page: string) => async (dispatch: Dispatch) => {
  dispatch(fetchingPage(true))

  try {
    const { data } = await api.get(`/p/${page}`)

    if (data && data.type === 'success') {
      dispatch(receivePage(page, data.data))
    }
  } catch (e) {}

  dispatch(fetchingPage(false))
}

/**
 * Action for receiving options object
 *
 * @param options Options object
 */
export const receiveOptions = (options: object): AnyAction => ({
  type: RECEIVE_OPTIONS,
  payload: {
    options
  }
})

/**
 * Fetches settings for whole page - title, meta etc.
 */
export const fetchOptions = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.get('/config')

    if (data && data.type === 'success') {
      dispatch(receiveOptions(data.data))
    }
  } catch (e) {}
}

// -- REDUCER
const reducer: Reducer<PageState> = (state: PageState = initialState, action: ReducerAction) => {
  switch (action.type) {
    case FETCHING_PAGE:
      return {
        ...state,
        loading: action.payload.loading
      }
    case RECEIVE_PAGE: {
      const pages = state.pages
      const { page, components } = action.payload

      return {
        ...state,
        pages: {
          ...pages,
          [page]: components
        }
      }
    }
    case RECEIVE_OPTIONS:
      return {
        ...state,
        options: action.payload.options
      }
    default: return state
  }
}
export default reducer
