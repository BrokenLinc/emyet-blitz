import React from "react"
import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import { AdminLayout } from "app/core/layouts/AdminLayout"
import createSkill from "app/skills/mutations/createSkill"
import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"
import { AdminOnly } from "app/components/AdminOnly"
import * as UI from "@chakra-ui/react"
import skillValidations from "app/skills/validations"

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
            router.push(Routes.ShowSkillPage({ skillId: skill.id }))
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
  return <AdminLayout title={"Create New Skill"}>{page}</AdminLayout>
}

export default NewSkillPage
