import { useCallback, useEffect } from "react";
import { Button, Input, RTE, Select } from "./index";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePost, addPost } from "../store/postSlice";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post ? post.content : "",
        status: post?.status || "active",
      },
    });

  const submit = async (data) => {
    try {
      if (post) {

        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) appwriteService.deleteFile(post.featuredImage);

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          dispatch(updatePost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData ? userData.$id : undefined,
          });

          if (dbPost) {
            dispatch(addPost(dbPost));
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.log("Error in PostForm's submit : ", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9]+/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug = slugTransform(value.title);

        setValue("slug", newSlug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.09)]"
    >
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/60 px-5 py-4 sm:px-7">
        <p className="text-xs text-slate-500"><span className="text-red-500">*</span> Required fields</p>
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Input
            label="Title"
            required
            placeholder="Title"
            className="mb-0"
            {...register("title", { required: true })}
          />

          <Input
            label="Slug"
            required
            placeholder="Slug"
            className="mb-0"
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
            {...register("slug", { required: true })}
          />

          <RTE
            label="Content"
            required
            name="content"
            control={control}
            defaultValue={getValues("content")}
            required
          />
        </div>

        <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 shadow-inner sm:p-6">
          <Input
            label="Featured Image"
            required={!post}
            type="file"
            className="mb-0 cursor-pointer file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="aspect-video w-full rounded-lg object-cover"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            required
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full cursor-pointer py-3"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
