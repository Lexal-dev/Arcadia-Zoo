import { useFirebase } from "@/app/context/commentsContext"
import DataItems from "@/components/data/comments/DataItems"


export default function DataTab() {
    const {comments} = useFirebase()
  return (
    <table className="shadow-lg rounded-lg border divide-y divide-x">
        <thead>
            <tr className="bg-gray-800 text-white">
                <th className="p-3 text-sm border">Id</th>
                <th className="p-3 text-sm border">pseudo</th>
                <th className="p-3 text-sm border">Comment</th>
                <th className="p-3 text-sm border">CreatedAt</th>
                <th className="p-3 text-sm border">IsValid</th>
                <th className="p-3 text-sm border">Actions</th>
            </tr>
        </thead>
        <tbody>
            {comments.map((comment) => (
                <DataItems key={comment.id} comment={comment}/>
            ))}
        </tbody>
    </table>
  )
}
