"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"

export default function CreatePost() {
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let toastPostID: string

  //Create a post
  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post("/api/posts/addPost", {
        title,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID })
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
       toast.success("Post has been made 🔥", { id: toastPostID })
       queryClient.invalidateQueries(["posts"])
        setTitle("")
        setIsDisabled(false)
      },
    }
  )
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    toastPostID = toast.loading("Creating your post", { id: toastPostID })
    setIsDisabled(true)
    mutate(title)
  } 

  return (
    <form onSubmit={submitPost} className="bg-black rounded-lg ">
      <div className="flex flex-col my-8">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2  bg-gray-900 shadow-lg shadow-indigo-500/50 border-2 border-indigo-900"
        />
      </div>
      <div className=" flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-indigo-500"
          } `}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/40 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit">
          Post
        </button>
      </div>
    </form>
  )
}