import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="h-full w-full font-sans">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
