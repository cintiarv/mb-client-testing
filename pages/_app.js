import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
