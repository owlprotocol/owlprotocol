import { extendTheme } from '@chakra-ui/react';
import { THEME_COLORS } from './themeColors.js';

const CURRENT_THEME = 'theme1';

const themeOverrides = {
    styles: {
        global: {
            'html, body': {
                backgroundColor: THEME_COLORS[CURRENT_THEME].background,
                color: THEME_COLORS[CURRENT_THEME].color4,
                lineHeight: '1.2',
            },
            a: {
                color: THEME_COLORS[CURRENT_THEME].color1,
            },
        },
    },
    textStyles: {
        title: {
            // responsive sizes TBA
            fontSize: ['20px', '20px'],
            fontWeight: '400',
            lineHeight: '27px',
        },
    },
    themes: THEME_COLORS[CURRENT_THEME],
};

export const theme = extendTheme(themeOverrides) as any;
