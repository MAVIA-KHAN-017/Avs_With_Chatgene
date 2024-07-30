import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "98vw",
    height: "95vh",
  };
  return (
    <div className="flex flex-col items-center" style={styles}>
      <div className="">
        <h1 className="text-6xl font-semibold text-center text-gray-700 dark:text-gray-200">
          404
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Page not found. Check the address or{" "}
          <Link
            className="text-purple-600 hover:underline dark:text-purple-300"
            to="/"
          >
            <Button className="ant-btn-primary">Go back</Button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page404;
