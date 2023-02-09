import FsContextPrv from '@/comps/cont/fsCont'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (<FsContextPrv><Component {...pageProps} /></FsContextPrv>)
}
