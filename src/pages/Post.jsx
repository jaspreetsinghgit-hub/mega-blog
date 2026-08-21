import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        dispatch(removePost(post.$id));
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 sm:py-14">
      <Container>
        <article className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative w-full bg-slate-100">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="max-h-[520px] w-full object-cover"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="mr-0">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="px-5 py-8 sm:px-10 sm:py-10">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {post.title}
            </h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}
