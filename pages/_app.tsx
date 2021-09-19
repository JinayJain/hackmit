import type { AppProps } from "next/app";
import "@fontsource/poppins/400.css"
import "@fontsource/poppins/700.css"
import "../styles/path.css"
import {
  ChakraProvider,
  extendTheme,
  theme as baseTheme,
} from "@chakra-ui/react";

const theme = extendTheme(
  {
    fonts: {
      heading: "Poppins",
      body: "Poppins",
    }
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
