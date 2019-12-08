/**
 * Selects page from store
 *
 * @param page Page name
 * @returns Page selector
 */
const selectPage = (page: string) => state => {
  // Select pages store
  const { page: storePage } = state
  // Get single page data
  const pageData = storePage.pages[page]

  if (!pageData) {
    return {}
  }

  return pageData || {}
}

export default selectPage
