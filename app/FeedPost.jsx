"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from "@/lib/utils";


const like = <FontAwesomeIcon icon={faHeart} />

//app/Post

export default function Post({ id, name, avatar, postTitle, comment, hearts, createdAt }) {

  var postDataDate = createdAt?.substring(0,10);
  
  var postDateSplit = postDataDate?.split("-");
  
  var postMonth = postDateSplit?.[1];
  
  var postDay = postDateSplit?.[2];
  
  var postYr = postDateSplit?.[0];
  
  var postFullDate = postMonth +"/"+ postDay +"/"+ postYr;

  const [active, setActive] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setActive(!active);
  };
console.log("hearts: ", hearts)
console.log("comment: ", comment)
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="bg-gray-900 my-8 p-8 rounded-lg shadow-lg shadow-indigo-500/50 border-2 border-indigo-900"
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-300">{name}</h3>
        <h3 className="text-sm  text-slate-500 truncate">{formatDate(createdAt)}</h3>
      </div>
      {/* {postFullDate} */}
      <div className="my-8 ">
        <p className="break-all text-gray-300">{postTitle}</p>
      </div>
      
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={{pathname: `/post/${id}`,}}>
          <p className=" text-sm font-bold text-gray-300">
            {comment?.length} Comments 
          </p>
        </Link>

        </div>
        <button  onClick={handleClick}
        style={{ color: active ? "indigo" : "gray" }}
         
          type="submit">
          {like}
        </button>
       
      
    </motion.div>
  )
}