"use client";

import React from "react";
import { CKEditor as CKEditorReact } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Link,
  Image,
  ImageUpload,
  Table,
  TableToolbar,
  BlockQuote,
  List,
  Heading,
  Indent,
  Base64UploadAdapter,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import type { CKEditorProps } from "@/types/components/editor/ck-editor-type";

const CKEditor = ({ value, onChange }: CKEditorProps) => {
  return (
    <div className="ck-editor-container prose">
      <CKEditorReact
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL",
          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Link,
            Image,
            ImageUpload,
            Table,
            TableToolbar,
            BlockQuote,
            List,
            Heading,
            Indent,
            Base64UploadAdapter,
          ],
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "undo",
            "redo",
          ],
          language: "ko",
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditor;
