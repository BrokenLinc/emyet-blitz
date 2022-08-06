import React from "react"
import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import * as UI from "@chakra-ui/react"

import { AdminLayout } from "app/core/layouts/AdminLayout"
import createSkill from "app/skills/mutations/createSkill"
import { SkillForm } from "app/skills/components/SkillForm"
import { AdminOnly } from "app/components/AdminOnly"
import skillValidations from "app/skills/validations"
import { FORM_ERROR } from "app/core/components/Form"

const NewSkillPage: BlitzPage = () => {
  const router = useRouter()
  const [createSkillMutation] = useMutation(createSkill)

  return (
    <AdminOnly>
      <UI.Heading mb={6}>New Skill</UI.Heading>
      <SkillForm
        schema={skillValidations.Create}
        submitLabel="Create Skill"
        onSubmit={async (values) => {
          try {
            const skill = await createSkillMutation(values)
            router.push(Routes.SkillsPage({ skillId: skill.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </AdminOnly>
  )
}

NewSkillPage.authenticate = true
NewSkillPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default NewSkillPage
