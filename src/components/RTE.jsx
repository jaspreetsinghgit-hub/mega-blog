import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "", required = false }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block pl-1 text-sm font-medium text-slate-700">
          {label}{required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        <Controller
          name={name || "content"}
          control={control}
          rules={required ? { required: true } : undefined}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family: Inter, Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #334155; padding: 8px 12px; }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
