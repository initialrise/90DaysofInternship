import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Markdown from "react-markdown";

import { useEffect, useState } from "react";
import { BlogType } from "@/types";
import supabase from "@/config/supabase";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<BlogType | null>(null);

  // async function handleEdit(): Promise<void> {}
  // async function handleDelete(): Promise<void> {}
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
      <Card>
        <CardHeader>
          <h1 className="font-bold text-[30px]">{blog && blog.title}</h1>
          <div className="blog-utils flex flex-start gap-2">
            <Button>Edit</Button>
            <Button>Remove</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Markdown>{blog && blog.content}</Markdown>
        </CardContent>
      </Card>
    </div>
  );
}
