import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  console.log(featuredImage);
  console.log(service.getFilePreview(featuredImage));

  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
        <div className="aspect-video w-full overflow-hidden bg-slate-200">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div className="border-t border-slate-100 bg-white p-5">
          <h2 className="line-clamp-2 text-lg font-extrabold leading-snug text-slate-900 transition group-hover:text-blue-700 sm:text-xl">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  );
}

export default PostCard;
