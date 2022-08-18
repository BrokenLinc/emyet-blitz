import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "app/blitz-client"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      theme={extendTheme({
        styles: {
          global: {
            [".highlighter"]: { bg: "green.200", borderRadius: "sm" },
            // https://github.com/FortAwesome/react-fontawesome/issues/512
            [".svg-inline--fa"]: {
              h: "1em",
              verticalAlign: "-0.125em",
            },
          },
        },
        components: {
          Link: {
            baseStyle: {
              color: "blue.400",
            },
          },
        },
      })}
    >
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ChakraProvider>
  )
}

export default withBlitz(MyApp)
