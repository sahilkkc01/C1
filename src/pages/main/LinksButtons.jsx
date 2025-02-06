import React, { useEffect, useState } from "react";

export default function LinksButtons() {
  const user_permissions = localStorage.getItem("user_permissions");
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (user_permissions) {
      // Parse the JSON string back into an object
      const parsedPermissions = JSON.parse(user_permissions);
      setPermissions(parsedPermissions);
      // console.log(parsedPermissions);
      // This will now log the object correctly
    }
  }, [user_permissions]);
  return (
    <>
      <div className="d-flex gap-1 flex-wrap mb-5">
        {permissions &&
          [
            ...new Set(
              permissions.map((permission) => permission.application.url)
            ),
          ] // Remove duplicates
            .map((url, i) =>
              [
                "https://ctas.live/gate",
                "https://ctas.live/rake",
                "https://ctas.live/CWHCartingReadLCL",
                "https://ctas.live/CWHCartingRead",
                "https://ctas.live/CWHDelivery",
                "https://ctas.live/CWHDeliveryReadLCL",
                "https://ctas.live/CWHDeliveryReadFCL",
                "https://ctas.live/CWHDeStuffingRead",
                "https://ctas.live/CWHDeStuffingReadLCL",
                "https://ctas.live/CWHStuffingReadFCL",
                "https://ctas.live/CWHStuffingRead",
                "https://ctas.live/RakeOutWord",
                "https://ctas.live/YardTransactions",
              ].includes(url) ? (
                <a
                  key={i}
                  href={url}
                  className="btn btn-sm btn-outline-success ms-2 mt-2"
                >
                  {url.replace("https://ctas.live/", "")}
                </a>
              ) : null
            )}
      </div>
    </>
  );
}
