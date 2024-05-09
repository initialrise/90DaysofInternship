import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import supabase from "@/config/supabase";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [supaError, setSupaError] = useState<string | null>(null);

  const navigate = useNavigate();
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const newBlog = {
      title,
      content,
    };
    const { error } = await supabase.from("blogs").insert(newBlog);
    if (error) {
      setSupaError("Adding failed");
      return;
    }
    navigate("/");
  }
  return (
    <>
      <form
        className="w-[600px] m-auto flex flex-col gap-[20px] items-start"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-[30px]">Add Blog</h1>
        {supaError && <div className="error">{supaError}</div>}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="title"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="content">Blog Content</Label>
          <Textarea
            placeholder="Type your blog content here."
            rows={10}
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {/* <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="content">Content</Label>
        <Input type="content" id="content" placeholder="Content" />
      </div> */}
        <Button>Add Blog</Button>
      </form>

      <Card className="w-[600px] m-auto mt-[10px]">
        <CardHeader className="font-bold">Live Preview</CardHeader>
        <CardContent>
          <Markdown>{content}</Markdown>
        </CardContent>
      </Card>
    </>
  );
}
