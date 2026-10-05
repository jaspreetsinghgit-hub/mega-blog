import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    service.getPost(slug).then((post) => {
      if (post) {
        setPost(post);
      } else {
        console.log("Post not found:", slug);
        navigate("/");
      }
    });
  }, [slug, navigate]);

  return post ? (
    <div className="py-8 sm:py-12">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;