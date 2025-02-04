

import React, { useState, memo, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import leftImage from "../assets/leftimage.png";
import rightImage from "../assets/Group 100.jpg";
import Logo from "../assets/Logo.png";
import Quill from "./Quill2";
import axios from "axios";

const Mail = memo(() => {
  const [emails, setEmails] = useState([]); // List of CC emails
  const [ccEmail, setCcEmail] = useState(""); // Input state for CC email
  const [file, setFile] = useState(null);
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [htmlTemplate, setHtmlTemplate] = useState(""); // Store HTML file content
  

  const cld = new Cloudinary({ cloud: { cloudName: "enter_cloud_name" } });

  // Example: Transform a Cloudinary image
  const transformedImage = cld
    .image("sample") // Replace 'sample' with the public ID of your image
    .resize(auto().gravity(autoGravity()).width(300).height(300))
    .format("auto")
    .quality("auto");

  const addEmail = () => {
    if (ccEmail.trim() !== "") {
      setEmails((prev) => [...prev, ccEmail]);
      setCcEmail(""); // Clear CC email input after adding
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSendMail = async () => {
    setLoading(true);
    setSuccess("");

    console.log(file);

    const formData = new FormData();
    formData.append("email", toEmail);
    formData.append("subject", subject);
    formData.append("content", injectedHtml);
    formData.append("cc", emails.join(","));
    if (file) formData.append('file', file); // Ensure this matches the server-side field name

    try {
        console.log("sending this frontend" , injectedHtml);
        const response = await axios.post("http://localhost:4000/api/sending-mail", formData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        if (response.status === 200) {
            setSuccess("Email sent successfully!");
            // Reset form fields
        } else {
            setSuccess("Failed to send email. Please try again.");
        }
    } catch (error) {
        setSuccess("Error sending email. Check your API.");
        console.error(error);
    }
    setLoading(false);
};



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

    const handleEmailChange = (e) => {
      setToEmail(e.target.value);
      console.log("Updated toEmail:", e.target.value);
    };
    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
      console.log("Updated subject:", e.target.value);
    };
        

  return (
    <section className="xl:h-screen w-full bg-black flex relative overflow-hidden">
      {/* Left Section */}
      <div className="xl:h-screen xl:w-20 h-screen w-6 bg-[#EE2922] flex justify-center items-end relative">
        <img
          src={leftImage}
          alt="left"
          className="absolute bottom-10 xl:h-[200px] xl:w-[80px] h-16 w-6"
        />
      </div>

      {/* Right Section */}
      <div>
        <img
          src={rightImage}
          alt="right"
          className="xl:h-[200px] xl:w-[100px] absolute right-0 h-16 w-8"
        />
      </div>

      {/* Content Section */}

      <div className="relative flex flex-col lg:flex-row items-start px-6 py-8 md:px-10 w-full">

      <div className="relative flex flex-col items- h-[90vh] w-full overflow-y-scroll">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={Logo} alt="TEDx DAVV Logo" className="w-24 md:w-36 h-auto" />
        </div>

        {/* Email Form Section */}
        <div className="mt-6 space-y-4 w-full md:w-4/5">
          {/* Email To */}
          <div>
            <label className="block text-white text-sm mb-4">EMAIL TO:</label>
            <input
              onChange={handleEmailChange}
              type="email"
              placeholder="xyz@gmail.com"
              className="w-[400px] p-1 bg-transparent border border-white text-white placeholder-white placeholder-opacity-50 rounded-[10px] focus:outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-white text-sm mb-4">SUBJECT:</label>
            <input
              onChange={handleSubjectChange}
              type="text"
              placeholder="Email Subject"
              className="w-[400px] p-1 bg-transparent border border-white text-white placeholder-white placeholder-opacity-50 rounded-[10px] focus:outline-none"
            />
          </div>

          {/* CC Section */}
          <div>
            <label className="block text-white text-sm mb-4">CC:</label>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                value={ccEmail}
                onChange={(e) => setCcEmail(e.target.value)}
                placeholder="Enter CC email"
                className="w-[400px] p-1 bg-transparent border border-white text-white placeholder-white placeholder-opacity-50 rounded-[10px] focus:outline-none"
              />
              <button
                onClick={addEmail}
                className="p-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                <AiOutlinePlus/>
              </button>
            </div>
          </div>

          {/* Display Added CC Emails */}
          <div className="flex flex-wrap gap-2 mt-2 overflow-x-auto">
            {emails.map((email, index) => (
              <div
                key={index}
                className="bg-white text-black px-3 py-1 rounded-full flex items-center justify-between text-xs shadow-md"
              >
                {email}
                <button
                  onClick={() =>
                    setEmails((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="ml-2 text-red-500 font-bold text-xs"
                >
                  <AiOutlineClose/>
                </button>
              </div>
            ))}
          </div>

          {/* Message Section */}
          <div className="mt-4">
            <div className="bg-black rounded-[13px] p-4 w-full max-w-[500px] border border-white">
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                placeholder="Write your message..."
                modules={{ toolbar: toolbarOptions }}
                theme="snow"
                className="bg-black text-white"
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
                max-height: 80vh;
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
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <div
                className="w-[300px] p-2 border-dashed border-2 border-white text-white text-center cursor-pointer rounded-lg"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                name="dropFile"
              >
                {file ? (
                  <p className="truncate">{file.name}</p>
                ) : (
                  <p>Drag & Drop a file here</p>
                )}
              </div>
              <span className="text-white">or</span>
              <label className="text-white underline cursor-pointer">
                <input
                  name="file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Browse File
              </label>
            </div>
          </div>

          {/* Send Button */}
          <div className="mt-4 flex justify-start">
            <button onClick={handleSendMail} className="w-24 h-10 py-2 bg-red-600 text-white rounded-full text-xs">
            {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>

        <div  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(injectedHtml) }}
              style={{
                position: "relative",
                // right: "5vw",
                // top: "6vh",
                border: "1px solid #ccc",
                padding: "5px",
                width: "100%",
                // backgroundColor: "white",
                height: "100%",
                overflowY: "auto", // Enables vertical scrolling
                overflowX: "hidden", // Prevents horizontal scrolling
                outline: "none", // Removes outline on focus
                zIndex: '20'
              }}
              tabIndex="0" // Enables keyboard scrolling
              onFocus={(e) => e.target.focus()} // Ensures it remains focusable
            />
          </div>
      

      {/* Right Section Rectangular Box */}
      {/* <div
        className="absolute right-10 top-10 border border-white placeholder-white placeholder-opacity-50 rounded-[10px]"
        style={{ width: "500px", height: "550px" }}
      ></div> */}
      
    </section>
  );
});

export default Mail;
