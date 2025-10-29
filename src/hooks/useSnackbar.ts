import { useState, useCallback } from "react";

export type SnackbarSeverity = "success" | "error" | "info" | "warning";

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("success");

  const showSnackbar = useCallback(
    (msg: string, sev: SnackbarSeverity = "success") => {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    open,
    message,
    severity,
    showSnackbar,
    hideSnackbar,
  };
};
