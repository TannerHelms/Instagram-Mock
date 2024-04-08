import { createTheme, rem } from "@mantine/core";

const appTheme = createTheme({
    fontFamily: "Montserrat, sans-serif",
    defaultRadius: "md",
    components: {
        Button: {
            vars: (theme, props) => {
                return {
                    root: {
                        "--button-height": rem(40),
                    },
                };
            },
            defaultProps: {
                // size: "xl",
                // color: "red",
            },
        },
        Input: {
            defaultProps: {
                radius: "lg",
                size: "xl",
            },
        },
        Center: {
            defaultProps: {
                bg: "#CACCD2",
            },
        },
        TextInput: {
            defaultProps: {
                size: "xl",
            },
        },
    },
});

export default appTheme;

