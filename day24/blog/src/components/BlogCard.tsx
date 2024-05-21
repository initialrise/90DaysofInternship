import { Link } from "react-router-dom";
import { BlogType } from "@/types";
import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>{blog.title}</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{blog.content.slice(0, 100)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/blog/${blog.id}`}>
          <Button>See More</Button>
        </Link>
        <span className="text-slate-600">
          Posted at {new Date(blog.created_at).toLocaleDateString("en-US")}
        </span>
      </CardFooter>
    </Card>
  );
}
