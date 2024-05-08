import React from "react";

function Send() {
  return (
    <div className="card">
      <div className="col-md-12 w-full p-7 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-sm">
          Dear <b>Puja</b>,
        </p>
        <p className="text-sm">
          I hope this message finds you well. As part of our ongoing commitment
          to excellence, I wanted to personally reach out and share some updates
          and insights that might be of interest to you.
        </p>
        <p className="text-sm">
          Over the recent months, we've embarked on a journey to enhance our
          product offerings, aiming to provide you with the best possible
          experience. Our team has been working diligently on developing
          innovative solutions designed to meet your unique needs and
          preferences.
        </p>
        <img
          src="/media/stock/600x400/img-2.jpg"
          className="my-3 mx-auto"
          style={{ width: "300px" }}
          alt="Descriptive Alt Text"
        />
        <p className="text-sm">
          In our quest for improvement, your feedback has been invaluable. It
          has helped us identify key areas for enhancement and has driven us to
          strive for greater heights. We're excited about the upcoming launches
          and confident that they will bring significant value to your daily
          experience.
        </p>
        <p className="text-sm">
          Thank you for your ongoing support and trust in us. We look forward to
          continuing to serve you and exceed your expectations.
        </p>
        <p className="text-sm">
          Warm regards,
          <br />
          <b>Your Team</b>
        </p>
        <button
          className="btn "
          style={{
            background: "#E2545E",
            color: "white",
            float: "right",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Send;
