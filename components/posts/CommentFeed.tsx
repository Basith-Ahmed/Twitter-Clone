import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[];
}

export default function CommentFeed({ comments = [] }: CommentFeedProps) {
  return (
    <>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <CommentItem key={comment.id} data={comment} />
          </div>
        );
      })}
    </>
  );
}
