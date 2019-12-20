import React from "react";

export default function Empty(props) {
  const tips = props.tips || "空空如也";

  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div>
        <img src="/static/images/empty.png" style={{ width: "160px" }} alt="" />
        <span style={{ color: "#999", fontSize: "18px" }}>{tips}</span>
      </div>
    </div>
  );
}
