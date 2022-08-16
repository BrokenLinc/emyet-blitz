import Head from "next/head"
import React from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import * as UI from "@chakra-ui/react"
import Link from "next/link"

const sideBarItems = [
  {
    label: "Animals (demo)",
    href: Routes.AnimalsPage(),
    newHref: Routes.NewAnimalPage(),
  },
  // {
  //   label: "Feats",
  //   href: Routes.SkillsPage(), // TODO
  //   newHref: Routes.NewSkillPage(), // TODO
  // },
  // {
  //   label: "Skills",
  //   href: Routes.SkillsPage(),
  //   newHref: Routes.NewSkillPage(),
  // },
]

export const AdminLayout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <React.Fragment>
      <Head>
        <title>{title || "emyet-blitz"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UI.Grid
        gridTemplateColumns="280px auto"
        gridTemplateRows="40px auto"
        gridTemplateAreas="
          'header header'
          'sidebar content'
          "
      >
        <UI.Box gridArea="header" bg="black" />
        <UI.Box gridArea="sidebar" borderRight="1px solid" borderColor="gray.200" p={6}>
          <UI.List>
            {sideBarItems.map((item) => (
              <UI.ListItem key={item.label}>
                <UI.HStack spacing={1}>
                  <Link href={item.href} passHref>
                    <UI.Link>{item.label}</UI.Link>
                  </Link>
                  <UI.Text color="gray.300">|</UI.Text>
                  <Link href={item.newHref} passHref>
                    <UI.Link>new</UI.Link>
                  </Link>
                </UI.HStack>
              </UI.ListItem>
            ))}
          </UI.List>
        </UI.Box>
        <UI.Box gridArea="content" p={6}>
          {children}
        </UI.Box>
      </UI.Grid>
    </React.Fragment>
  )
}
