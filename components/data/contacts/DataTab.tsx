import { useFirebase } from "@/app/context/ContactsContext"
import DataItems from "@/components/data/contacts/DataItems"


export default function DataTab() {
    const {contacts} = useFirebase()
  return (
    <table className="shadow-lg rounded-lg border divide-y divide-x">
        <thead>
            <tr className="bg-gray-800 text-white">
                <th className="p-3 text-sm border">Id</th>
                <th className="p-3 text-sm border">title</th>
                <th className="p-3 text-sm border">email</th>
                <th className="p-3 text-sm border">description</th>
                <th className="p-3 text-sm border">statut</th>
                <th className="p-3 text-sm border">createdAt</th>
                <th className="p-3 text-sm border">updatedAt</th>
            </tr>
        </thead>
        <tbody>
            {contacts.map((contact) => (
                <DataItems key={contact.id} contact={contact}/>
            ))}
        </tbody>
    </table>
  )
}