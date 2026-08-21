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
    console.log("Inside postForms submit");

    try {
      if (post) {
        console.log(data);
        console.log("Image:", data.image);

        console.log("User:", userData);
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) appwriteService.deleteFile(post.featuredImage);

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        console.log("file:", file);
        console.log("userData:", userData);

        console.log("post:", post);
        if (dbPost) {
          dispatch(updatePost(dbPost));
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        console.log(data);
        console.log("Image:", data.image);

        console.log("User:", userData);
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

          console.log("file:", file);
          console.log("userData:", userData);

          console.log("post:", post);
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
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <p className="mb-5 text-xs text-slate-500"><span className="text-red-500">*</span> Required fields</p>
      <div className="grid grid-cols-1 gap-7 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
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

        <div className="space-y-5">
          <Input
            label="Featured Image"
            required={!post}
            type="file"
            className="mb-0 cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />

          {post && (
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
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
            className="w-full cursor-pointer"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
