"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { PostType } from "../types/CommentsPost"

type Comment = {
  postId?: string
  title: string
}
type PostProps = {
  id?: string
}
export default function AddComment({ id }: PostProps) {
  let commentToastId: string
  
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    async (data: Comment) => {
      return axios.post("/api/posts/addComment", { data })
    },
    {
      onSuccess: (data) => {
       // console.log("addComment: ", data)
        queryClient.invalidateQueries(["detail-post"])
        setTitle("")
        setIsDisabled(false)
        toast.success("Added your comment", { id: commentToastId })
      },
      onError: (error) => {
        console.log(error)
        setIsDisabled(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId })
        }
      },
    }
  )

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    commentToastId = toast.loading("Adding your comment", {
      id: commentToastId,
    })
    mutate({ title, postId: id })
  }
  return (
    <form onSubmit={submitPost} className="my-8">
      <h3 className="text-xl">Add a comment</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg text-gray-300 rounded-md my-2 bg-gray-900 shadow-lg shadow-indigo-500/50 border-2 border-indigo-900"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/40 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit">
          Add Comment
        </button>
        <p className={`font-bold  ${title.length > 300 ? "text-red-700" : "text-indigo-500" }`}> 
            {`${title.length}/300`} 
        </p>
      </div>
    </form>
  )
}