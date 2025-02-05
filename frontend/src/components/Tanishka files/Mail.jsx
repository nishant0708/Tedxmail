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
import axios from "axios";

const Mail = memo(() => {
  const [emails, setEmails] = useState([]);
  const [ccEmail, setCcEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [file, setFile] = useState(null);
  const [toEmail, setToEmail] = useState("");
  const [toEmailError, setToEmailError] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [htmlTemplate, setHtmlTemplate] = useState("");

  const cld = new Cloudinary({ cloud: { cloudName: "enter_cloud_name" } });

  const transformedImage = cld
    .image("sample")
    .resize(auto().gravity(autoGravity()).width(300).height(300))
    .format("auto")
    .quality("auto");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmail = () => {
    if (ccEmail.trim() === "") {
      setEmailError("Email cannot be empty");
      return;
    }

    if (!validateEmail(ccEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmails((prev) => [...prev, ccEmail]);
    setCcEmail("");
    setEmailError("");
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
    if (!validateEmail(toEmail)) {
      setToEmailError("Please enter a valid recipient email address");
      return;
    }

    setLoading(true);
    setSuccess("");
    setToEmailError("");

    const formData = new FormData();
    formData.append("email", toEmail);
    formData.append("subject", subject);
    formData.append("content", injectedHtml);
    formData.append("cc", emails.join(","));
    if (file) formData.append("name", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/send-email",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setSuccess("Email sent successfully!");
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
    fetch("/indexspeaker.html")
      .then((response) => response.text())
      .then((data) => {
        setHtmlTemplate(data);
      })
      .catch((error) => console.error("Error loading template:", error));
  }, []);

  const injectedHtml = htmlTemplate.replace("{{EDITOR_CONTENT}}", editorContent);

  const toolbarOptions = [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ];

  const callFakeApi = async (content) => {
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

  useEffect(() => {
    if (editorContent) {
      if (typingTimeout) clearTimeout(typingTimeout);
      const timeout = setTimeout(() => {
        callFakeApi(editorContent);
      }, 1000);
      setTypingTimeout(timeout);
    }
  }, [editorContent]);

  const handleEmailChange = (e) => {
    setToEmail(e.target.value);
    setToEmailError("");
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  return (
    <section className="min-h-screen w-full bg-black flex flex-col sm:flex-row relative overflow-hidden">
      <div className="sm:h-screen sm:w-20 w-full h-12 bg-[#EE2922] flex justify-center items-end relative sm:opacity-100 opacity-0 transition-opacity duration-500">
        <img
          src={leftImage}
          alt="left"
          className="absolute bottom-2 sm:bottom-10 sm:h-[200px] sm:w-[80px] h-10 w-6 sm:opacity-100 opacity-0 transition-opacity duration-500"
        />
      </div>

      <div>
        <img
          src={rightImage}
          alt="right"
          className="sm:h-[200px] sm:w-[100px] absolute right-0 top-0 h-10 w-8 sm:opacity-100 opacity-0 transition-opacity duration-500"
        />
      </div>

      <div className="relative flex flex-col items-start px-4 sm:px-6 py-4 sm:py-8 w-full">
        <div className="flex items-center w-full justify-center sm:justify-start">
          <img src={Logo} alt="TEDx DAVV Logo" className="w-20 sm:w-36 h-auto" />
        </div>

        <div className="mt-4 sm:mt-6 space-y-4 w-full">
          <div>
            <label className="block text-white text-xs sm:text-sm mb-2 sm:mb-4">
              EMAIL TO:
            </label>
            <div className="flex flex-col space-y-1">
              <input
                onChange={handleEmailChange}
                type="email"
                placeholder="xyz@gmail.com"
                className={`p-[6px] w-full sm:w-[400px] p-1 bg-transparent border ${
                  toEmailError ? "border-red-500" : "border-white"
                } text-white placeholder-white placeholder-opacity-50 rounded-[10px] focus:outline-none text-xs sm:text-base`}
              />
              {toEmailError && (
                <span className="text-red-500 text-xs">{toEmailError}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white text-xs sm:text-sm mb-2 sm:mb-4">
              SUBJECT:
            </label>
            <input
              onChange={handleSubjectChange}
              type="text"
              placeholder="Email Subject"
              className="w-full p-[6px] sm:w-[400px] p-1 bg-transparent border border-white text-white placeholder-white placeholder-opacity-50 rounded-[10px] focus:outline-none text-xs sm:text-base"
            />
          </div>

          <div>
            <label className="block text-white text-xs sm:text-sm mb-2 sm:mb-4">
              CC:
            </label>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  value={ccEmail}
                  onChange={(e) => {
                    setCcEmail(e.target.value);
                    setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevents form submission
                      addEmail();
                    }
                  }}
                  placeholder="Enter CC email"
                  className={`w-full p-[6px] sm:w-[400px] p-1 bg-transparent border ${
                    emailError ? "border-red-500" : "border-white"
                  } text-white placeholder-white placeholder-opacity-50 rounded-[10px] focus:outline-none text-xs sm:text-base`}
                />
                <button
                  onClick={addEmail}
                  className="p-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs"
                >
                  <AiOutlinePlus />
                </button>
              </div>
              {emailError && (
                <span className="text-red-500 text-xs">{emailError}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 overflow-x-auto">
            {emails.map((email, index) => (
              <div
                key={index}
                className="bg-white text-black px-2 py-1 rounded-full flex items-center justify-between text-xs sm:text-sm shadow-md"
              >
                {email}
                <button
                  onClick={() =>
                    setEmails((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="ml-2 text-red-500 font-bold text-xs"
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="bg-black rounded-[13px] p-2 sm:p-4 w-full max-w-full sm:max-w-[500px] border border-white">
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                placeholder="Write your message..."
                modules={{ toolbar: toolbarOptions }}
                theme="snow"
                className="bg-black text-white h-[250px] flex flex-col"
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div
                className="w-full sm:w-[300px] p-2 border-dashed border-2 border-white text-white text-center cursor-pointer rounded-lg text-xs sm:text-base"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {file ? (
                  <p className="truncate">{file.name}</p>
                ) : (
                  <p>Drag & Drop a file here</p>
                )}
              </div>
              <span className="text-white text-xs sm:text-base">or</span>
              <label className="text-white underline cursor-pointer text-xs sm:text-base">
                <input
                  name="name"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Browse File
              </label>
            </div>
          </div>

          <div className="mt-4 flex justify-center sm:justify-start">
            <button
              onClick={handleSendMail}
              className="w-24 h-10 py-2 bg-red-600 text-white rounded-full text-xs sm:text-sm"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          <div className="w-full mt-4 sm:absolute sm:right-[5vw] sm:top-[6vh] sm:w-full md:w-[40vw] sm:h-full sm:border-[1px] sm:border-[#ccc] sm:p-[5px] sm:bg-white sm:z-20">
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(injectedHtml) }}
              className="w-full h-full overflow-y-auto"
            />
          </div>

          {success && (
            <div className="mt-4 text-center">
              <span className={success.includes("Error") ? "text-red-500" : "text-green-500"}>
                {success}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default Mail;