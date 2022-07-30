import React from "react"
import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSkill, { CreateSkill } from "app/skills/mutations/createSkill"
import { SkillForm, FORM_ERROR } from "app/skills/components/SkillForm"
import { AdminOnly } from "app/components/AdminOnly"

const NewSkillPage: BlitzPage = () => {
  const router = useRouter()
  const [createSkillMutation] = useMutation(createSkill)

  return (
    <AdminOnly>
      <h1>Create New Skill</h1>

      <SkillForm
        submitText="Create Skill"
        schema={CreateSkill}
        onSubmit={async (values) => {
          try {
            const skill = await createSkillMutation({ ...values, gameid: 0, isdeleted: true }) // TODO: remove gameid
            router.push(Routes.ShowSkillPage({ skillId: skill.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SkillsPage()}>
          <a>Skills</a>
        </Link>
      </p>
    </AdminOnly>
  )
}

NewSkillPage.authenticate = true
NewSkillPage.getLayout = (page) => {
  return <Layout title={"Create New Skill"}>{page}</Layout>
}

export default NewSkillPage
