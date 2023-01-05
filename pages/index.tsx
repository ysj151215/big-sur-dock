import Head from 'next/head'
import Dock from '../components/dock/Dock'

const Home = () => {
  return (
    <>
      <Head>
        <title>macOS Big Sur dock</title>
        <meta
          name="description"
          content="Build a macOS Big Sur style dock with Next.js, react-use, Tailwind CSS and Framer Motion."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dock />
    </>
  )
}

export default Home
