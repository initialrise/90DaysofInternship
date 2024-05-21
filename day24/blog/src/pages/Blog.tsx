import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Markdown from "react-markdown";

import { useEffect, useState } from "react";
import { BlogType } from "@/types";
import supabase from "@/config/supabase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);

  // async function handleEdit(): Promise<void> {}
  const navigate = useNavigate();
  async function handleDelete(blogId: number): Promise<void> {
    await supabase.from("blogs").delete().eq("id", blogId);
    navigate("/");
  }
  async function getBlog(): Promise<void> {
    const { data } = await supabase
      .from("blogs")
      .select()
      .eq("id", blogId)
      .single();
    setBlog(data);
  }

  useEffect(() => {
    getBlog();
  }, []);
  return (
    <div className="blog w-[600px] m-auto flex flex-col gap-[10px]">
      {blog ? (
        <Card>
          <CardHeader>
            <h1 className="font-bold text-[30px]">{blog.title}</h1>
            <div className="blog-utils flex flex-start gap-2">
              <Button disabled>Edit</Button>
              <Button onClick={() => handleDelete(blog.id)}>Remove</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Markdown>{blog.content}</Markdown>
          </CardContent>
        </Card>
      ) : (
        "Blog Not Found"
      )}
    </div>
  );
}
