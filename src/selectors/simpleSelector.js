import { createSelector } from 'reselect'


const shopItemsSelector = state => {
    return state
}
const subtotalSelector = createSelector(
    shopItemsSelector,
)

export default subtotalSelector;