import Button from './Button';
import { THEME_COLORS } from '../../constants/index.js';

const components = (CURRENT_THEME: string) => {
    // @ts-ignore
    const { color1, color6, color7, color9, color11 } = THEME_COLORS[CURRENT_THEME];

    return {
        Button: Button(CURRENT_THEME),
        Text: {
            baseStyle: {
                color: color9,
            },
            variants: {
                'form-label': {
                    fontSize: 18,
                    fontWeight: 600,
                    color: color9,
                    mb: 4,
                },
                'grad-1': {
                    bg: 'linear-gradient(99.23deg, #942457 1.6%, #8318DD 97.94%)',
                    backgroundClip: 'text',
                },
            },
        },
        Container: {
            baseStyle: {
                w: '100%',
                maxW: '1200px',
            },
        },
        Divider: {
            baseStyle: {
                borderColor: color6,
            },
        },
        AccordionIcon: {
            baseStyle: {
                w: '26px',
                h: '26px',
                marginLeft: 'auto',
            },
        },
        AccordionButton: {
            baseStyle: {
                color: color9,
                fontSize: 14,
                fontWeight: 600,
                _focus: {
                    outline: 0,
                    boxShadow: 0,
                },
            },
        },
        FormLabel: {
            baseStyle: {
                fontSize: 18,
                fontWeight: 600,
                color: color9,
                mb: 4,
            },
        },
        Input: {
            variants: {
                form: {
                    field: {
                        height: '52px',
                        color: color7,
                        borderRadius: 8,
                        backgroundColor: color6,
                        outline: 0,
                        _placeholder: {
                            color: color9,
                        },
                        _focus: {
                            outline: 0,
                            boxShadow: 0,
                            borderWidth: 2,
                            borderColor: color1,
                        },
                    },
                },
            },
        },
        Textarea: {
            variants: {
                form: {
                    minHeight: '104px',
                    color: color7,
                    borderRadius: 8,
                    backgroundColor: color6,
                    outline: 0,
                    _placeholder: {
                        color: color9,
                    },
                    _focus: {
                        outline: 0,
                        boxShadow: 0,
                        borderWidth: 2,
                        borderColor: color1,
                    },
                },
            },
        },
        Link: {
            baseStyle: {
                color: color1,
                _focus: {
                    outline: 0,
                    boxShadow: 0,
                },
            },
            variants: {
                header: {
                    fontWeight: 700,
                    _hover: {
                        color: color11,
                        textDecor: 'none',
                    },
                },
            },
        },
        Select: {
            baseStyle: {
                bg: color6,
                color: color9,
            },
            variants: {
                form: {
                    borderRadius: 12,
                    height: '54px',
                    color: color7,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: color6,
                    outline: 0,
                    _placeholder: {
                        color: color9,
                    },
                    _focus: {
                        outline: 0,
                        boxShadow: 0,
                        borderWidth: 2,
                        borderColor: color1,
                    },
                },
                hollow: {
                    h: '27px',
                    bg: 'transparent',
                    color: color9,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: color9,
                },
            },
        },
        Tab: {
            baseStyle: {
                bg: color6,
                color: color9,
            },
        },
    };
};

export default components;
