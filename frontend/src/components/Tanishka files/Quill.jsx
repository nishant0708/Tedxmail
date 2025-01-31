

// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const Quill = () => {
//   const [editorContent, setEditorContent] = useState(""); // Stores Quill content
//   const [debouncedContent, setDebouncedContent] = useState(""); // Stores content after debounce

//   // Debounce mechanism: Simulate API call when user stops typing for 1 second
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       if (editorContent) {
//         setDebouncedContent(editorContent); // Store HTML content
//         fakeAPI(editorContent);
//       }
//     }, 1000); 

//     return () => clearTimeout(handler); // Cleanup function
//   }, [editorContent]); // Runs whenever editorContent changes

//   // Fake API function (logs data instead of sending to backend)
//   const fakeAPI = (htmlContent) => {
//     console.log("Simulated API Call: Content saved as HTML ⬇️");
//     console.log(htmlContent);
//     localStorage.setItem("quillContent", htmlContent); // Store in local storage (for testing)
//   };

//   return (
//     <div className="relative flex flex-col items-center p-4">
//       {/* Quill Editor */}
//       <div className="bg-black rounded-[13px] p-4 w-full max-w-[500px] border border-white">
//         <ReactQuill
//           value={editorContent}
//           onChange={setEditorContent} // Updates state on text input
//           placeholder="Write your message..."
//           modules={{
//             toolbar: [
//               [{ header: [1, 2, 3, false] }],
//               ["bold", "italic", "underline", "strike"],
//               [{ list: "ordered" }, { list: "bullet" }],
//               ["link", "image"],
//               ["clean"],
//             ],
//           }}
//           theme="snow"
//           className="bg-black text-white"
//         />
//       </div>

//       {/* Render HTML formatted content */}
//       <div
//         // className="absolute right-10 top-10 border border-white placeholder-white placeholder-opacity-50 rounded-[10px]"
//         // style={{ width: "500px", height: "550px" }}
//         // dangerouslySetInnerHTML={{ __html: debouncedContent }} // Display saved HTML content
//       />
//     </div>
//   );
// };

// export default Quill;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = () => {
  const [editorContent, setEditorContent] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Custom toolbar options
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ];

 
  const callFakeApi = async (content) => {
    console.log("Calling API with content:", content);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({ text: content }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("Fake API Response:", data);
    } catch (error) {
      console.error("API Call Failed:", error);
    }
  };

  // Handle Text Change with Debounce
  useEffect(() => {
    if (editorContent) {
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        callFakeApi(editorContent); 
      }, 1000); 
      setTypingTimeout(timeout);
    }
  }, [editorContent]);

  return (
    <div className="bg-black rounded-[13px] p-4 w-full max-w-[500px] border border-white">
      <ReactQuill
        value={editorContent}
        onChange={setEditorContent}
        placeholder="Write your message..."
        modules={{ toolbar: toolbarOptions }}
        theme="snow"
        className="bg-black text-white"
      />

      <div dangerouslySetInnerHTML={{ __html: editorContent }} style={{ position: 'absolute', right: '100px', top: '25vh' , border: "1px solid #ccc", padding: "10px", minWidth: '400px', backgroundColor:'white', minHeight: "50vh" }} />
   
      <style jsx>{`
        .ql-toolbar {
          background-color: #000;
          border: none;
          border-bottom: 1px solid white;
          border-radius: 13px 13px 0 0;
        }
        .ql-container {
          background-color: #000;
          color: white;
          border: none;
          border-radius: 0 0 13px 13px;
          max-height: 100px; /* Fixed height */
          overflow-y: auto; /* Enable scrolling */
        }
        .ql-toolbar button {
          color: white;
        }
        .ql-toolbar button:hover {
          background-color: #ee2922;
        }
        .ql-editor {
          color: white;
          line-height: 1.6;
        }
        .ql-editor::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Quill;
