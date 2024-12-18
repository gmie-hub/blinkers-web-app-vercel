// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // Ensure this is the correct import
// import { ErrorMessage } from "formik";

// interface EditorProps {
//   label: string;
//   name?: string;
//   initialData?: string;
//   onChange?: (name: string, editor: any) => void;
// }

// const Editor = ({ label, name, onChange, initialData }: EditorProps) => {
//   return (
//     <div className="editor-container"> {/* Apply a custom container class */}
//       <label>{label}</label>
//       <CKEditor
//         editor={ClassicEditor}
//         data={initialData || ""}
//         config={{
//           toolbar: [
//             "heading",
//             "|",
//             "bold",
//             "italic",
//             "link",
//             "|",
//             "undo",
//             "redo",
//             "numberedList",
//             "bulletedList",
//           ],
//         }}
//         onChange={( editor) => {
//           if (onChange && name) {
//             onChange(name, editor); // Pass editor instance for use
//           }
//         }}
//       />
//       {name && (
//         <ErrorMessage name={name}>
//           {(msg) => <span className="error">{msg}</span>}
//         </ErrorMessage>
//       )}
//     </div>
//   );
// };

// export default Editor;


import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // Ensure this is the correct import
import { ErrorMessage } from "formik";

interface EditorProps {
  label: string;
  name?: string;
  initialData?: string;
  onChange?: (name: string, editor: any) => void;
}

const Editor = ({ label, name, onChange, initialData }: EditorProps) => {
  return (
    <div className="editor-container"> {/* Apply a custom container class */}
      <label>{label}</label>
      <CKEditor
        editor={ClassicEditor}
        data={initialData || ""}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "undo",
            "redo",
            "numberedList",
            "bulletedList",
          ],
        }}
        onChange={( editor) => {
          if (onChange && name) {
            onChange(name, editor); // Pass editor instance for use
          }
        }}
      />
      {name && (
        <ErrorMessage name={name}>
          {(msg) => <span className="error">{msg}</span>}
        </ErrorMessage>
      )}
    </div>
  );
};

export default Editor;
