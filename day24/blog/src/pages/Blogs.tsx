import supabase from "@/config/supabase";
import { useEffect, useState } from "react";
import { BlogType } from "@/types";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[] | null>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogs();
  }, []);

  async function getBlogs(): Promise<void> {
    const { data, error } = await supabase.from("blogs").select();
    if (error) {
      setBlogs(null);
      setError("Fetch was unsuccessful");
      console.log(error);
    } else {
      setBlogs(data);
      setError("");
    }
  }
  return (
    <div className="blogs h-screen w-[600px] p-[30px] m-auto flex flex-col gap-[20px] align-center ">
      <header className="flex justify-between">
        <h1 className="font-bold text-[30px]">Blogs</h1>
        <Link to="/add">
          <Button>Add Blog</Button>
        </Link>
      </header>
      {error && error}
      {blogs && blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
}
export default Blogs;
