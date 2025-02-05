import React, { useState, memo, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
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
  const [file, setFile] = useState(null);
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [htmlTemplate, setHtmlTemplate] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileURL, setFileURL] = useState("");

  const cld = new Cloudinary({ cloud: { cloudName: "enter_cloud_name" } });

  const transformedImage = cld
    .image("sample")
    .resize(auto().gravity(autoGravity()).width(300).height(300))
    .format("auto")
    .quality("auto");



    const checkFileExists = async (fileName) => {
      try {
        // Reference to the emails folder
        const folderRef = ref(storage, 'emails');
        
        // List all files in the folder
        const filesList = await listAll(folderRef);
        
        // Find a file with matching name
        for (const fileRef of filesList.items) {
          // Remove the timestamp prefix from stored files to match with new filename
          const storedFileName = fileRef.name.split('-').slice(1).join('-');
          
          if (storedFileName === fileName) {
            // If match found, get and return its URL
            const url = await getDownloadURL(fileRef);
            return { exists: true, url };
          }
        }
        
        return { exists: false };
      } catch (error) {
        console.error("Error checking file existence:", error);
        return { exists: false };
      }
    };
    

    const uploadToFirebase = async (file) => {
      if (!file) return null;
    
      try {
        // Check if file with same name exists
        const { exists, url } = await checkFileExists(file.name);
        
        if (exists) {
          console.log("File already exists, returning existing URL");
          // Return existing file URL without uploading
          setFileURL(url);
          setUploadProgress(100);
          return url;
        }
    
        // If file doesn't exist, proceed with upload
        const storageRef = ref(storage, `emails/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Upload error:", error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setFileURL(downloadURL);
              resolve(downloadURL);
            }
          );
        });
      } catch (error) {
        console.error("Error in uploadToFirebase:", error);
        throw error;
      }
    };
    

  const addEmail = () => {
    if (ccEmail.trim() !== "") {
      setEmails((prev) => [...prev, ccEmail]);
      setCcEmail("");
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

    try {
      let attachmentURL = "";
      if (file) {
        attachmentURL = await uploadToFirebase(file);
      }
      

      const formData = new FormData();
      formData.append("email", toEmail);
      formData.append("subject", subject);
      formData.append("content", injectedHtml);
      formData.append("cc", emails.join(","));
      if (attachmentURL) {
        formData.append("attachmentURL", attachmentURL);
      }

      console.log("email", toEmail);
      

      const response = await axios.post(
        "http://localhost:4000/api/sending-mail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Email sent successfully!");
        // Reset form
        setToEmail("");
        setSubject("");
        setEditorContent("");
        setEmails([]);
        setFile(null);
        setFileURL("");
        setUploadProgress(0);
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
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
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
                value={toEmail}
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
                value={subject}
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
                  <AiOutlinePlus />
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
                    <AiOutlineClose />
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
                    <div>
                      <p className="truncate">{file.name}</p>
                      {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-red-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
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

            {/* Success Message */}
            {success && (
              <div className="mt-4">
                <p className={`text-sm ${success.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {success}
                </p>
              </div>
            )}

            {/* Send Button */}
            <div className="mt-4 flex justify-start">
              <button
                onClick={handleSendMail}
                disabled={loading}
                className="w-24 h-10 py-2 bg-red-600 text-white rounded-full text-xs disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(injectedHtml) }}
          style={{
            position: "relative",
            border: "1px solid #ccc",
            padding: "5px",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            outline: "none",
            zIndex: "20",
          }}
          tabIndex="0"
          onFocus={(e) => e.target.focus()}
        />
      </div>
    </section>
  );
});

export default Mail;