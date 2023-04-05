"use client"

import Post from "@/app/FeedPost"
import AddComment from "../../components/AddComment"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostType } from "../../types/CommentsPost"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils";

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

  //var commentDataDate = data?.comment;
  var commentDataDate:any = data?.comment
  
  for(var val of commentDataDate){
      const commentDate = formatDate(val?.createdAt);
      //console.log(commentDate)
    //   var commentDateSplit = testing;
    
    //   var commentMonth = commentDateSplit?.[1];
    
    //   var commentDay = commentDateSplit?.[2];
    
    //   var commentYr = commentDateSplit?.[0];
    
       var commentFullDate = commentDate
     // console.log("commentFullDate: ", commentFullDate)
  }


  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        postTitle={data?.title}
        comment={data?.comment}
       
        createdAt={data?.createdAt}
      />
      <AddComment id={data?.id} />
      {data?.comment?.map((comment) => (
         
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: "easeOut" }}
          className="my-6 bg-gray-900 shadow-lg shadow-indigo-500/50 border-2 border-indigo-900 p-8 rounded-md"
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
            <h3 className="font-bold text-gray-300">{comment?.user?.name}</h3>
            <h2 className="text-sm text-slate-500 truncate">{commentFullDate}</h2>
          </div>
          <div className="py-4 text-gray-300">{comment.title}</div>
        </motion.div>
      ))}
    </div>
  )
}