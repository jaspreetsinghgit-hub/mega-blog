import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../store/postSlice";

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

  const deletePost = async () => {
    const status = await service.deletePost(post.$id);

    if (status) {
      if (post.featuredImage) {
        await service.deleteFile(post.featuredImage);
      }

      dispatch(removePost(post.$id));
      navigate("/");
    }
  };

  return post ? (
    <div className="w-full py-10 sm:py-16">
      <Container>
        <article className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)]">
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

          <div className="px-6 py-9 sm:px-12 sm:py-12">
            <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {post.title}
            </h1>

            <div className="browser-css">
              {parse(DOMPurify.sanitize(post.content))}
            </div>
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}
