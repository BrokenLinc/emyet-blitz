import React from "react"
import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSkill from "app/skills/mutations/createSkill"
import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"
import { AdminOnly } from "app/components/AdminOnly"
import * as UI from "@chakra-ui/react"
import skillSchemas from "app/skills/schemas"

const NewSkillPage: BlitzPage = () => {
  const router = useRouter()
  const [createSkillMutation] = useMutation(createSkill)

  return (
    <AdminOnly>
      <UI.Heading mb={6}>Create New Skill</UI.Heading>

      <SkillForm
        schema={skillSchemas.Create}
        initialValues={{ isdeleted: false }}
        submitLabel="Create Skill"
        onSubmit={async (values) => {
          console.log("values", values)
          try {
            const skill = await createSkillMutation(values)
            router.push(Routes.ShowSkillPage({ skillId: skill.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <Link href={Routes.SkillsPage()} passHref>
        <UI.Link>Skills</UI.Link>
      </Link>
    </AdminOnly>
  )
}

NewSkillPage.authenticate = true
NewSkillPage.getLayout = (page) => {
  return <Layout title={"Create New Skill"}>{page}</Layout>
}

export default NewSkillPage
