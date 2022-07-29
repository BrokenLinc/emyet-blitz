import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSkill from "app/skills/queries/getSkill"
import { SkillsMutations } from "app/skills/mutations"

export const Skill = () => {
  const router = useRouter()
  const skillId = useParam("skillId", "string")
  const [deleteSkillMutation] = useMutation(SkillsMutations.remove)
  const [skill] = useQuery(getSkill, { id: skillId })

  return (
    <>
      <Head>
        <title>Skill {skill.id}</title>
      </Head>

      <div>
        <h1>Skill {skill.id}</h1>
        <pre>{JSON.stringify(skill, null, 2)}</pre>

        <Link href={Routes.EditSkillPage({ skillId: skill.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSkillMutation({ id: skill.id })
              router.push(Routes.SkillsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowSkillPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SkillsPage()}>
          <a>Skills</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Skill />
      </Suspense>
    </div>
  )
}

ShowSkillPage.authenticate = true
ShowSkillPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSkillPage
