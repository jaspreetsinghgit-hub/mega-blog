import { PostCard, Container } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const posts = useSelector((state) => state.post.posts);

  return (
    <div className="w-full py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts &&
            posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
