"use client"
import CommentDisplay from "@/components/ui/comment/CommentDisplay";
import CommentButton from "@/components/ui/comment/CommentButton";
import ContactButton from "@/components/ui/contact/ContactButton";
import { CommentsProvider } from "./context/commentsContext";
export default function Home() {
  return (
    <CommentsProvider>
      <main className="flex flex-col items-center h-full w-full p-12 gap-6">
        <h1 className="text-4xl font-bold">Home</h1>
        <CommentDisplay />
        <div className="flex flex-col justify-center">
          <CommentButton />
          <ContactButton />        
        </div>
      </main>
    </CommentsProvider>
  );
}