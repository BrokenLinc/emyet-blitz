import { Head, BlitzLayout } from "blitz"
import React from "react"
import * as UI from "@chakra-ui/react"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title || "emyet-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UI.Box p={4}>{children}</UI.Box>
    </React.Fragment>
  )
}

export default Layout
