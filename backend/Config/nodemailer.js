require("dotenv").config();
const nodemailer = require("nodemailer");

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP via email
exports.sendOtpToEmail = async (email, otp, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Your OTP Code",
      text: text || `Your OTP code is ${otp}`, // Use the provided text or a default message
    });
    console.log("OTP sent successfully via email");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};


// Function to send mail
exports.sendEmail = async (email, ccArray, subject , content) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      cc: ccArray,
      subject: subject,
      html: `<!DOCTYPE html>
<html
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Lato"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (max-width: 535px) {
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }

        .icons-inner {
          text-align: center;
        }

        .icons-inner td {
          margin: 0 auto;
        }

        .image_block img.big,
        .row-content {
          width: 100% !important;
        }

        .mobile_hide {
          display: none;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }

        .row-3 .column-1 {
          padding: 45px 0 20px !important;
        }
      }
    </style>
  </head>

  <body
    style="
      background-color: #fbf8f1;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      class="nl-container"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        background-color: #fbf8f1;
      "
    >
      <tbody>
        <tr>
          <td>
            <table
              class="row row-1"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #000000;
                background-size: auto;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-size: auto;
                        color: #000000;
                        width: 515px;
                      "
                      width="515"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="image_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  <div
                                    class="alignment"
                                    align="center"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      class="big"
                                      src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/966518_951093/g.png"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        width: 515px;
                                        max-width: 100%;
                                      "
                                      width="515"
                                    />
                                  </div>
                                  <!-- <div class="alignment" align="center" style="line-height:10px"><img class="big" src="https://imgur.com/jStAeea.png" style="display: block; height: auto; border: 0; width: 515px; max-width: 100%;" width="515"></div> -->
                                </td>
                              </tr>
                            </table>
                            <div
                              class="spacer_block block-2"
                              style="
                                height: 11px;
                                line-height: 11px;
                                font-size: 1px;
                              "
                            >
                              &#8202;
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-2"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-size: auto;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-size: auto;
                        color: #000000;
                        width: 515px;
                      "
                      width="515"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <div
                              class="spacer_block block-1"
                              style="
                                height: 60px;
                                line-height: 60px;
                                font-size: 1px;
                              "
                            >
                              &#8202;
                            </div>
                            <table
                              class="text_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 50px;
                                    padding-left: 5px;
                                    padding-right: 5px;
                                    padding-top: 5px;
                                  "
                                >
                                  <div
                                    style="
                                      font-family: 'Trebuchet MS', Tahoma,
                                        sans-serif;
                                    "
                                  >
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        font-family: 'Montserrat',
                                        'Trebuchet MS', 'Lucida Grande',
                                        'Lucida Sans Unicode', 'Lucida Sans',
                                        Tahoma, sans-serif;
                                        mso-line-height-alt: 21.6px;
                                        color: #000000;
                                        line-height: 1.8;
                                      "></div>

                                      ${content}
                                   
                                     <p>Warm regards, <br> Curator | TEDxDAVV
                                       <br>
                                       <!-- <b>Location:</b> DAVV, Indore, Auditorium  <br>
                                       <b>Tentative Date:</b> February 22nd, 2025<br> -->
                                    
                                   
                                    <a href="mailto:tedxdavv@gmail.com">tedxdavv@gmail.com</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-3"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #000000;
                background-position: center top;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-repeat: no-repeat;
                        color: #000000;
                        width: 515px;
                      "
                      width="515"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 60px;
                              padding-top: 45px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="heading_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 5px;
                                    padding-left: 15px;
                                    padding-right: 15px;
                                    padding-top: 5px;
                                    text-align: center;
                                    width: 100%;
                                  "
                                >
                                  <h1
                                    style="
                                      margin: 0;
                                      color: #eb0028;
                                      direction: ltr;
                                      font-family: 'Montserrat', 'Trebuchet MS',
                                        'Lucida Grande', 'Lucida Sans Unicode',
                                        'Lucida Sans', Tahoma, sans-serif;
                                      font-size: 33px;
                                      font-weight: normal;
                                      letter-spacing: normal;
                                      line-height: 120%;
                                      text-align: center;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                    "
                                  >
                                    <strong>Our Instagram Feed!</strong>
                                  </h1>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="text_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 20px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 5px;
                                  "
                                >
                                  <div
                                    style="
                                      font-family: 'Trebuchet MS', Tahoma,
                                        sans-serif;
                                    "
                                  >
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        font-family: 'Montserrat',
                                          'Trebuchet MS', 'Lucida Grande',
                                          'Lucida Sans Unicode', 'Lucida Sans',
                                          Tahoma, sans-serif;
                                        mso-line-height-alt: 25.2px;
                                        color: #ffffff;
                                        line-height: 1.8;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 25.2px;
                                        "
                                      >
                                        We promise to create not just a talk
                                        show, but a Festival and our art is the
                                        testament to our commitment.
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="image_block block-3"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0px;
                                    padding-left: 0px;
                                  "
                                >
                                  <div
                                    class="alignment"
                                    align="center"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      class="big"
                                      src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/966518_951093/8cef9e08-937f-4bf3-bbfa-6c541f7ced7b.jfif"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        width: 515px;
                                        max-width: 100%;
                                      "
                                      width="515"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="button_block block-4"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 15px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 15px;
                                    text-align: center;
                                  "
                                >
                                  <div class="alignment" align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.instagram.com/tedxdavv" style="height:38px;width:172px;v-text-anchor:middle;" arcsize="22%" stroke="false" fillcolor="#eb0028"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:'Trebuchet MS', Tahoma, sans-serif; font-size:14px"><!
                                    [endif]--><a
                                      href="https://www.instagram.com/tedxdavv"
                                      target="_blank"
                                      style="
                                        text-decoration: none;
                                        display: inline-block;
                                        color: #ffffff;
                                        background-color: #eb0028;
                                        border-radius: 8px;
                                        width: auto;
                                        border-top: 0px solid #8a3b8f;
                                        font-weight: undefined;
                                        border-right: 0px solid #8a3b8f;
                                        border-bottom: 0px solid #8a3b8f;
                                        border-left: 0px solid #8a3b8f;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        font-family: 'Montserrat',
                                          'Trebuchet MS', 'Lucida Grande',
                                          'Lucida Sans Unicode', 'Lucida Sans',
                                          Tahoma, sans-serif;
                                        font-size: 14px;
                                        text-align: center;
                                        mso-border-alt: none;
                                        word-break: keep-all;
                                      "
                                      ><span
                                        style="
                                          padding-left: 30px;
                                          padding-right: 30px;
                                          font-size: 14px;
                                          display: inline-block;
                                          letter-spacing: 4px;
                                        "
                                        ><span
                                          dir="ltr"
                                          style="word-break: break-word"
                                          ><span
                                            style="line-height: 28px"
                                            dir="ltr"
                                            data-mce-style
                                            ><strong>FOLLOW US</strong></span
                                          ></span
                                        ></span
                                      ></a
                                    >><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-4"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #eb0028;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 515px;
                      "
                      width="515"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 10px;
                              padding-top: 25px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="heading_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 10px;
                                    padding-left: 15px;
                                    padding-right: 15px;
                                    padding-top: 5px;
                                    text-align: center;
                                    width: 100%;
                                  "
                                >
                                  <h1
                                    style="
                                      margin: 0;
                                      color: #ffffff;
                                      direction: ltr;
                                      font-family: 'Montserrat', 'Trebuchet MS',
                                        'Lucida Grande', 'Lucida Sans Unicode',
                                        'Lucida Sans', Tahoma, sans-serif;
                                      font-size: 27px;
                                      font-weight: normal;
                                      letter-spacing: normal;
                                      line-height: 120%;
                                      text-align: center;
                                      margin-top: 0;
                                      margin-bottom: 0;
                                    "
                                  >
                                    <strong>Why TEDx DAVV?</strong>
                                  </h1>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="text_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 30px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 15px;
                                  "
                                >
                                  <div
                                    style="
                                      font-family: Tahoma, Verdana, sans-serif;
                                    "
                                  >
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        font-family: 'Lato', Tahoma, Verdana,
                                          Segoe, sans-serif;
                                        mso-line-height-alt: 21px;
                                        color: #ffffff;
                                        line-height: 1.5;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          text-align: center;
                                          mso-line-height-alt: 21px;
                                        "
                                      >
                                        TEDxDAVV is the platform that aims to
                                        inspire and encourage individuals to
                                        think creatively and make a positive
                                        impact on the world.
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          text-align: center;
                                          mso-line-height-alt: 21px;
                                        "
                                      >
                                        &nbsp;
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          text-align: center;
                                          mso-line-height-alt: 21px;
                                        "
                                      >
                                        The Students of DAVV made a choice to
                                        bring to the world at large, something
                                        extraordinary and is now
                                        inviting&nbsp;you to make the choice
                                        that creates all THE DIFFERENCE!
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-5"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-position: center top;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 515px;
                      "
                      width="515"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 10px;
                              padding-top: 10px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <div
                              class="spacer_block block-1"
                              style="
                                height: 20px;
                                line-height: 20px;
                                font-size: 1px;
                              "
                            >
                              &#8202;
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-6"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-position: top center;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 515px;
                      "
                      width="515"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="58.333333333333336%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="text_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 5px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 5px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 12px;
                                        font-family: Lato, Tahoma, Verdana,
                                          Segoe, sans-serif;
                                        mso-line-height-alt: 14.399999999999999px;
                                        color: #39374e;
                                        line-height: 1.2;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: left;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        <span
                                          style="
                                            color: #39374e;
                                            font-size: 12px;
                                          "
                                          >Stay up-to-date with current
                                          activities and future updates by
                                          following us on your favorite social
                                          media channels.</span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td
                            class="column column-2"
                            width="41.666666666666664%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="social_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-bottom: 5px;
                                    padding-left: 10px;
                                    padding-right: 10px;
                                    padding-top: 5px;
                                    text-align: center;
                                  "
                                >
                                  <div class="alignment" align="center">
                                    <table
                                      class="social-table"
                                      width="184px"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        display: inline-block;
                                      "
                                    >
                                      <tr>
                                        <td style="padding: 0 7px 0 7px">
                                          <a
                                            href="https://twitter.com/tedxdavv"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/twitter@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Twitter"
                                              title="Twitter"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 7px 0 7px">
                                          <a
                                            href="https://instagram.com/tedxdavv"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Instagram"
                                              title="Instagram"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 7px 0 7px">
                                          <a
                                            href="https://www.linkedin.com/company/tedxdavv"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/linkedin@2x.png"
                                              width="32"
                                              height="32"
                                              alt="LinkedIn"
                                              title="LinkedIn"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 7px 0 7px">
                                          <a
                                            href="https://www.tedxdavv.in"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/website@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Web Site"
                                              title="Web Site"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-7"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000000;
                        width: 515px;
                      "
                      width="515"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              class="icons_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    vertical-align: middle;
                                    color: #9d9d9d;
                                    font-family: inherit;
                                    font-size: 15px;
                                    padding-bottom: 5px;
                                    padding-top: 5px;
                                    text-align: center;
                                  "
                                >
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                    "
                                  >
                                    <tr>
                                      <td
                                        class="alignment"
                                        style="
                                          vertical-align: middle;
                                          text-align: center;
                                        "
                                      >
                                        <!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                        <!--[if !vml]><!-->
                                        <table
                                          class="icons-inner"
                                          style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            display: inline-block;
                                            margin-right: -4px;
                                            padding-left: 0px;
                                            padding-right: 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          role="presentation"
                                        >
                                          <!--<![endif]-->
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>
`
    });
    console.log("OTP sent successfully via email");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};