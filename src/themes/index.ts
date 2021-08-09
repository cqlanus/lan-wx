import { store } from '../redux/store'
import { selectTheme } from '../redux/selectors'
import light from './light'
import dark from './dark'

const themes = () => {
    const theme = selectTheme(store.getState())
    return theme === 'light' ? light : dark
}

export default themes
