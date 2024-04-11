//USING THEME
export const THEME_COLORS = {
    MAIN: '#FF204E',
    SECOND: '#A0153E',
    DARK: '#00224D',
    LIGHT: '#FF204E',
    BACKGROUND: 'GREY'
}
// BACKUP - 1
export const THEME_COLOR_2 = {
    MAIN: '#41C9E2',
    SECOND: '#ACE2E1',
    DARK: '#008DDA',
    LIGHT: '#F7EEDD'
}
//BACKUP - 2
export const THEME_COLOR_NEW = {
    MAIN: '#D6589F',
    SECOND: '#D895DA',
    DARK: '#D20062',
    LIGHT: '#C4E4FF'
}

// USING SIZE
const SIZES = {
    SMALL: `10px`,
    MEDIUM: `20px`,
    LARGE: `30px`,
    BORDER_WIDTH: `2px`,
    MARGIN: `5px`
};

// set THEME to css file
document.documentElement.style.setProperty('--primary-color', THEME_COLORS.MAIN);
document.documentElement.style.setProperty('--second-color', THEME_COLORS.SECOND);
document.documentElement.style.setProperty('--dark-color', THEME_COLORS.DARK);
document.documentElement.style.setProperty('--light-color', THEME_COLORS.LIGHT);
document.documentElement.style.setProperty('--background-color', THEME_COLORS.BACKGROUND);

// set SIZE
document.documentElement.style.setProperty('--small-size', SIZES.SMALL);
document.documentElement.style.setProperty('--medium-size', SIZES.MEDIUM);
document.documentElement.style.setProperty('--lagre-size', SIZES.LARGE);
document.documentElement.style.setProperty('--border-w-size', SIZES.BORDER_WIDTH);
document.documentElement.style.setProperty('--margin-size', SIZES.MARGIN);
