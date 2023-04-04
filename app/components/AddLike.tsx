"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { PostType } from "../types/CommentsPost"


type Heart = {
  postId?: string
  userId?: string
}
type PostProps = {
  id?: string
}
export default function AddLike({ id }: PostProps) {
  let heartToastId: string
  
  const [userId, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    async (data: Heart) => {
      return axios.post("/api/posts/addLike", { data })
    },
    {
      onSuccess: (data) => {
       console.log("hearts: ", data)
        queryClient.invalidateQueries(["detail-post"])
        
       
      },
      onError: (error) => {
        console.log(error)
        setIsDisabled(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: heartToastId })
        }
      },
    }
  )

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    heartToastId = toast.loading("Adding your comment", {
      id: heartToastId,
    })
    mutate({ userId, postId: id })
  }
  return (
  
  <div>
    <AddLike />
    <h1>hearts</h1>
  </div>
  )
}