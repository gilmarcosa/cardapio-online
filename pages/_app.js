import "@/styles/globals.css";
import { Merriweather, Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={openSans.className}>
      <Component {...pageProps} />
    </main>
  );
}
