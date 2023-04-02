"use client"

import Post from "@/app/Post"
import AddComment from "../../components/AddComment"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostType } from "../../types/Post"
import { motion } from "framer-motion"
//This is for MyPost page
type URL = {
  params: {
    slug: string
  }
  searchParams: string
}
//Fetch All posts
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`)
  return response.data
}

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
   
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  })
  if (isLoading) {return "Loading"};

  var commentDataDate = data?.updatedAt?.substring(0,10);
  console.log("SlugcommentDate: ", commentDataDate)

  var commentDateSplit = commentDataDate?.split("-");
  
  var commentMonth = commentDateSplit?.[1];
  
  var commentDay = commentDateSplit?.[2];
  
  var commentYr = commentDateSplit?.[0];
  
  var commentFullDate = commentMonth +"/"+ commentDay +"/"+ commentYr;
  
  console.log("commentFullDate: ", commentFullDate)

  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comment={data?.comment}
      />
      <AddComment id={data?.id} />
      {data?.comment?.map((comment) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          className="my-6 bg-white p-8 rounded-md"
          key={comment.id}
        >
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={32}
              height={32}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{
            comment?.createdAt?.substring(0,10)
             }</h2>
          </div>
          <div className="py-4">{comment.title}</div>
        </motion.div>
      ))}
    </div>
  )
}