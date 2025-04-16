// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // Ensure this is the correct import
import { ErrorMessage } from "formik";

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

interface EditorProps {
  label: string;
  name?: string;
  initialData?: string;
  onChange?: (name: string, editor: any) => void;
}

const Editor = ({ label, name, onChange, initialData }: EditorProps) => {
  return (
    <div className="    "> {/* Apply a custom container class */}
      <label>{label}</label>
      <CKEditor
        editor={ClassicEditor}
        data={initialData || ""}
        config={{
          // licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NzYzODM5OTksImp0aSI6Ijk4Y2Y0ODVlLTI5ZGYtNDc2Mi1hODFiLTU1NjcwZGY1Yzc4OCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiODJiYTM3MzUifQ.mdIRVCl3_vo-jGU0EA551sDHq_V4nUNaQnf0bDjaxLSbjjnFfiRc3ilaliKPz5MgvOZfaH8wli9XnDZJHAG2jQ',
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
        onChange={(event, editor) => {
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

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"; // Ensure this is the correct import
// import { ErrorMessage } from "formik";

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { CKEditor } from '@ckeditor/ckeditor5-react';

// interface EditorProps {
//   label: string;
//   name?: string;
//   initialData?: string;
//   onChange?: (name: string, editor: any) => void;
// }

// const Editor = ({ label, name, onChange, initialData }: EditorProps) => {
//   return (
//     <div className="    "> {/* Apply a custom container class */}
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
//         onChange={(event, editor) => {
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
