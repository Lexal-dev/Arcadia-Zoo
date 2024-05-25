import React from 'react'
import { useEffect, useState } from "react";
import { useFirebase } from "@/app/context/commentsContext";
import { CommentsDataType } from "@/app/types/useTypes";


export default function CommentDisplay() {
  
  const { comments } = useFirebase();
  const [validComments, setValidComments] = useState<CommentsDataType[]>([]);
  const [randomComments, setRandomComments] = useState<CommentsDataType[]>([]);

  useEffect(() => {
    const filteredComments = comments.filter(comment => comment.isValid === true);
    setValidComments(filteredComments);
  }, [comments]);

  useEffect(() => {
    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledComments = shuffleArray(validComments);
    const limitedComments = shuffledComments.slice(0, 20);
    setRandomComments(limitedComments);
  }, [validComments]);

    return (
        <section className="flex flex-wrap gap-5 p-5 w-2/3 max-h-[500px] overflow-y-auto bg-gray-100 scrollbar-custom shadow-md rounded-lg">
          {randomComments.map((comment, index) => (
            <div key={index} className="flex flex-col justify-center p-3 border-2 border-green-500 rounded-lg">
              <div className="font-bold text-xl mb-2">{comment.pseudo}</div>
              <small>Avis:</small>
              <p>{comment.comment}</p>
            </div>
          ))}
        </section>
    );
}
