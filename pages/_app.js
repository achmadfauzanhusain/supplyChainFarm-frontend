import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    document.documentElement.classList.remove("dark")
  }, [])
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  )
}
