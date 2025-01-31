


// import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// const defaultTemplate = `
//   <div style="font-family: Arial, sans-serif; color: black; text-align: center; padding: 20px;">
//     <img src="https://via.placeholder.com/500x150" alt="TEDx Banner"
//       style="width:100%; max-height:150px; object-fit: cover; border-radius: 10px;"/>

//     <h2 style="color: red; margin-top: 10px;">TEDxDAVV</h2>
//     <h3 style="color: #ee2922; margin-top: -10px;">Speaker Invitation</h3>
    
//     <p style="text-align: left;">Hi,</p>
//     <p style="text-align: left;">
//       I hope this message finds you well. My name is Anuva, and I am the curator of TEDxDAVV...
//     </p>
    
//     <p style="text-align: left;">
//       The theme for this year’s event is <strong>'The Within'</strong>, which seeks to explore the inner journeys...
//     </p>
    
//     <p style="text-align: left;">Looking forward to your response.</p>

//     <p style="text-align: left;">
//       Warm regards,<br/>
//       <strong>Anuva</strong><br/>
//       Curator, TEDxDAVV
//     </p>
//   </div>
// `;

// const Quill = () => {
//   const [editorContent, setEditorContent] = useState(defaultTemplate);
//   const previewRef = useRef(null);

//   // Focus the div when mounted
//   useEffect(() => {
//     if (previewRef.current) {
//       previewRef.current.focus();
//     }
//   }, []);

//   // Handle Keyboard Arrow Scrolling
//   const handleKeyDown = (e) => {
//     if (previewRef.current) {
//       if (e.key === "ArrowDown") {
//         previewRef.current.scrollTop += 20;
//       } else if (e.key === "ArrowUp") {
//         previewRef.current.scrollTop -= 20;
//       }
//     }
//   };

//   return (
//     <div className="bg-black rounded-[13px] p-4 w-full max-w-[500px] border border-white">
//       <ReactQuill
//         value={editorContent}
//         onChange={setEditorContent}
//         placeholder="Write your message..."
//         theme="snow"
//         className="bg-black text-white"
//       />

//       {/* 🛠️ **Scrollable Template Preview Box** */}
//       <div
//         ref={previewRef}
//         dangerouslySetInnerHTML={{ __html: editorContent }}
//         style={{
//           position: "absolute",
//           right: "160px",
//           top: "6vh",
//           border: "1px solid #ccc",
//           padding: "15px",
//           width: "250px",
//           backgroundColor: "white",
//           height: "86vh",
//           overflowY: "auto", // Enables scrolling
//           overflowX: "hidden",
//           outline: "none",
//         }}
//         tabIndex="0" // Enables keyboard scrolling
//         onKeyDown={handleKeyDown} // Handles arrow key scrolling
//       />

//       <style jsx>{`
//         .ql-toolbar {
//           background-color: #000;
//           border: none;
//           border-bottom: 1px solid white;
//           border-radius: 13px 13px 0 0;
//         }
//         .ql-container {
//           background-color: #000;
//           color: white;
//           border: none;
//           border-radius: 0 0 13px 13px;
//           max-height: 100px;
//           overflow-y: auto;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Quill;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

// const defaultTemplate = `
//   <div style="font-family: Arial, sans-serif; color: black; text-align: center; padding: 20px;">
//     <img src="https://via.placeholder.com/500x150" alt="TEDx Banner"
//       style="width:100%; max-height:150px; object-fit: cover; border-radius: 10px;"/>

//     <h2 style="color: red; margin-top: 10px;">TEDxDAVV</h2>
//     <h3 style="color: #ee2922; margin-top: -10px;">Speaker Invitation</h3>
    
//     <p style="text-align: left;">Hi,</p>
//     <p style="text-align: left;">
//       I hope this message finds you well. My name is Anuva, and I am the curator of TEDxDAVV...
//     </p>
    
//     <p style="text-align: left;">
//       The theme for this year’s event is <strong>'The Within'</strong>, which seeks to explore the inner journeys...
//     </p>
    
//     <p style="text-align: left;">Looking forward to your response.</p>

//     <p style="text-align: left;">
//       Warm regards,<br/>
//       <strong>Anuva</strong><br/>
//       Curator, TEDxDAVV
//     </p>
//   </div>
// `;

const Quill = () => {
  const [editorContent, setEditorContent] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [htmlTemplate, setHtmlTemplate] = useState(""); // Store HTML file content

  useEffect(() => {
    fetch("/indexspeaker.html") // ✅ Fetch from public folder
      .then((response) => response.text())
      .then((data) => {
        setHtmlTemplate(data);
      })
      .catch((error) => console.error("Error loading template:", error));
  }, []);


   // Inject the editor content inside a placeholder in the HTML
   const injectedHtml = htmlTemplate.replace("{{EDITOR_CONTENT}}", editorContent);


  // Toolbar options
  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ];

  // Fake API Call (Simulating Save)
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

  // Handle Debounced API Call
  useEffect(() => {
    if (editorContent) {
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        callFakeApi(editorContent);
      }, 1000);
      setTypingTimeout(timeout);
      console.log(editorContent);
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

     <div
        // dangerouslySetInnerHTML={{ __html: editorContent }}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(injectedHtml) }}
        style={{
          position: "absolute",
          right: "5vw",
          top: "6vh",
          border: "1px solid #ccc",
          padding: "15px",
          width: "35vw",
          backgroundColor: "white",
          height: "86vh",
          overflowY: "auto", // Enables vertical scrolling
          overflowX: "hidden", // Prevents horizontal scrolling
          outline: "none", // Removes outline on focus
          zIndex: '20'
        }}
        tabIndex="0" // Enables keyboard scrolling
        onFocus={(e) => e.target.focus()} // Ensures it remains focusable
      />




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
          max-height: 100px;
          overflow-y: auto;
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

