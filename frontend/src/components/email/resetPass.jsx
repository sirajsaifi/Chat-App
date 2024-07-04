import * as React from "react";
import { Html, Button } from "@react-email/components";

const ResetPassEmail = () => {
  return (
    <Html lang="en" dir="ltr">
      <Preview>ChatApp password reset</Preview>
      <Button href="https://example.com" style={{ color: "#61dafb" }}>
        Click me
      </Button>
    </Html>
  );
};

export default ResetPassEmail;
