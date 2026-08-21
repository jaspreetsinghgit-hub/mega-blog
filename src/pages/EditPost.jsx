import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      console.log(slug);
      service.getPost(slug).then((post) => setPost(post));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-10 sm:py-14">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
