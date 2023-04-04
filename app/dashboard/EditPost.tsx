"use client"

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios from "axios"
import { motion } from "framer-motion"
import Link from "next/link"
import { formatDate } from "@/lib/utils";

type EditProps = {
  id: string
  avatar: string
  name: string
  title: string
  createdAt: string
  comment?: {
    id: string
    postId: string
    userId: string
  }[]
}

export default function EditPost({
  avatar,
  name,
  title,
  createdAt,
  comment,
  id,
}: EditProps) {
   const [toggle, setToggle] = useState(false)
   const queryClient = useQueryClient()
   let deleteToastID: string

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/posts/deletePost", { data: id }),
      
    {
      onError: (error) => {
        console.log(error)
        toast.error("Unable to delete your post. Try again later.", { id: deleteToastID })
      },
      onSuccess: (data) => {
        console.log(data)
        queryClient.invalidateQueries(["auth-posts"])
        toast.success("Post has been deleted.", { id: deleteToastID })
      },
    }
  )

  const deletePost = () => {
   deleteToastID = toast.loading("Deleting your post.", { id: deleteToastID })
    mutate(id)
  }
  var commentDataDate:any = createdAt.substring(0,10).split("-")
      var commentDateSplit = commentDataDate;
    
      var commentMonth = commentDateSplit?.[1];
    
      var commentDay = commentDateSplit?.[2];
    
      var commentYr = commentDateSplit?.[0];
    
      var myPostsFullDate = commentMonth +"/"+ commentDay +"/"+ commentYr;
    //  console.log("myPostsFullDate: ", myPostsFullDate)

  
  return (
    <>
       <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ ease: "easeOut" }}
        className="bg-gray-900 my-8 p-8 rounded-lg shadow-lg shadow-indigo-500/50 border-2 border-indigo-900">
        <div className="flex items-center gap-2">
          <Image 
          className="rounded-full"
              width={32}
              height={32}
          src={avatar} 
          alt="avatar" />
          <h3 className="font-bold text-gray-300">{name}</h3>
          <h2 className="text-sm text-slate-500 truncate">{formatDate(createdAt)}</h2>
        </div>
        
        <div className="my-8 ">
          <p className="break-all text-gray-300">{title}</p>
        </div>
        <div className="flex items-center gap-4 ">
        <div className="flex gap-4 cursor-pointer items-center">
        <Link href={{pathname: `/post/${id}`,}}>
          <p className=" text-sm font-bold text-gray-300">
            {comment?.length} Comments
          </p>
        </Link>
        </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
               setToggle(true)
            }}
            className="text-sm font-bold text-indigo-500">
            Delete
          </button>
        </div>
       </motion.div> 
      
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
    </>
  )
}