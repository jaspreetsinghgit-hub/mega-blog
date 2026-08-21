import { useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/postSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    service
      .getPosts([])
      .then((posts) => {
        if (posts) dispatch(setPosts(posts.rows));
      })
      .catch((err) => console.log("Error in Home Page's useEffect", err));
  }, []);

  const posts = useSelector((state) => state.post.posts);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 sm:py-20">
        <Container>
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              No posts available yet
            </h1>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10 sm:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
