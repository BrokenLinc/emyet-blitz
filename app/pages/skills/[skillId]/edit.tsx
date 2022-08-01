import React, { Suspense } from "react"
import { useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import * as UI from "@chakra-ui/react"

import { AdminLayout } from "app/core/layouts/AdminLayout"
import getSkill from "app/skills/queries/getSkill"
import updateSkill from "app/skills/mutations/updateSkill"
import { SkillForm } from "app/skills/components/SkillForm"
import skillValidations from "app/skills/validations"
import { FORM_ERROR } from "app/core/components/Form"

export const EditSkill = () => {
  const router = useRouter()
  const skillId = useParam("skillId", "string")
  const [skill, { setQueryData }] = useQuery(
    getSkill,
    { id: skillId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSkillMutation] = useMutation(updateSkill)

  return (
    <React.Fragment>
      <UI.Heading mb={6}>Edit Skill: {skill.name}</UI.Heading>
      <SkillForm
        mode="edit"
        schema={skillValidations.Update}
        initialValues={skill}
        submitLabel="Update Skill"
        onSubmit={async (values) => {
          try {
            const updated = await updateSkillMutation(values)
            await setQueryData(updated)
            router.push(Routes.ShowSkillPage({ skillId: updated.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </React.Fragment>
  )
}

const EditSkillPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditSkill />
    </Suspense>
  )
}

EditSkillPage.authenticate = true
EditSkillPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>

export default EditSkillPage
