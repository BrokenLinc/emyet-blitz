import React, { Suspense } from "react"
import { useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import * as UI from "@chakra-ui/react"

import { AdminLayout } from "app/core/layouts/AdminLayout"
import getSkill from "app/skills/queries/getSkill"
import updateSkill from "app/skills/mutations/updateSkill"
import { SkillForm } from "app/skills/components/SkillForm"
import skillValidations from "app/skills/validations"
import { FORM_ERROR } from "app/core/components/Form"
// import deleteSkill from "app/skills/mutations/deleteSkill"

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
  // const [deleteSkillMutation] = useMutation(deleteSkill)

  // const handleDeleteClick = async () => {
  //   if (window.confirm("This will be deleted")) {
  //     await deleteSkillMutation({ id: skill.id })
  //     router.push(Routes.SkillsPage())
  //   }
  // }

  return (
    <React.Fragment>
      <UI.HStack justifyContent="space-between" alignItems="center">
        <UI.Heading mb={6}>Edit Skill: {skill.name}</UI.Heading>
        {/* <UI.Button variant="outline" colorScheme="red" size="sm" onClick={handleDeleteClick}>
          Delete permanently
        </UI.Button> */}
      </UI.HStack>
      <SkillForm
        mode="edit"
        schema={skillValidations.Update}
        initialValues={skill}
        submitLabel="Update Skill"
        onSubmit={async (values) => {
          try {
            const updated = await updateSkillMutation(values)
            await setQueryData(updated)
            router.push(Routes.SkillsPage({ skillId: updated.id }))
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
