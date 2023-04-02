"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const like = <FontAwesomeIcon icon={faHeart} />

//app/Post

export default function Post({ id, name, avatar, postTitle, comment, createdAt }) {

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

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="bg-white my-8 p-8 rounded-lg "
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
        <h3 className="text-sm text-slate-500 truncate">{postFullDate}</h3>
      </div>
      <div className="my-8 ">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={{pathname: `/post/${id}`,}}>
          <p className=" text-sm font-bold text-gray-700">
            {comment?.length} Comments 
          </p>
        </Link>
        <button  onClick={handleClick}
        style={{ color: active ? "red" : "gray" }}
         
          type="submit">
          {like}
        </button>
       
      </div>
    </motion.div>
  )
}