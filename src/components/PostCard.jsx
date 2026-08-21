import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  console.log(featuredImage);
  console.log(service.getFilePreview(featuredImage));

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-4 sm:p-5">
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-blue-600 sm:text-xl">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
