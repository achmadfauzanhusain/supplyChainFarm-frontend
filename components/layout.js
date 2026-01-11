import Head from "next/head"
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
import { ThemeProvider } from "next-themes"

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>TBLO</title>
                <meta name="color-scheme" content="light"></meta>
            </Head>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                <main className={`${poppins.className} px-2 sm:px-4 md:px-12 lg:px-20 mt-8 mx-auto`}>{children}</main>
            </ThemeProvider>
        </>
    )
}

export default Layout