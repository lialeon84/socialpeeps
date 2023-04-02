import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/api/auth/signin")
  }
  //make welcome based on the time of the day and maybe the weather
  return (
    <main>
      <h1 className="text-2xl font-bold">Hello {session?.user?.name}!</h1>
      <MyPosts />
    </main>
  )
}