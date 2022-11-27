import Head from 'next/head'
import Dock from '../components/dock/Dock'

export default function Home() {
  return (
    <>
      <Head>
        <title>macOS Big Sur dock</title>
        <meta
          name="description"
          content="Build a macOS Big Sur style dock with Next.js, react-use, Tailwind CSS and Framer Motion."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dock />
    </>
  )
}
