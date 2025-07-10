import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store";
import { Provider } from "react-redux";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (<Provider store={store}><Layout><Component {...pageProps} /></Layout></Provider>);
}
