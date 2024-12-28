import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  timestamp: Date;
  content: string;
}

export function PostCard({ author, title, timestamp, content }: PostCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">{author.name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2">{title}</h4>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
