import type { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  theme as baseTheme,
} from "@chakra-ui/react";

const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          bg: "#f5f5f5",
        },
      },
    },
  },
  baseTheme
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
