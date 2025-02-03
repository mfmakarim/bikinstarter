"use client";

import { useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "@/lib/utils";
import { Button } from "./ui/button";
import { Cookie } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

// CookieBanner component that displays a banner for cookie consent.
export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Retrieve cookie consent status from local storage on component mount
  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    console.log("Cookie Consent retrieved from storage: ", storedCookieConsent);
    setCookieConsent(storedCookieConsent);
    setIsLoading(false);
  }, []);

  // Update local storage and Google Analytics consent status when cookieConsent changes
  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage("cookie_consent", cookieConsent);
    }

    const newValue = cookieConsent ? "granted" : "denied";

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newValue,
      });
    }
  }, [cookieConsent]);

  // Do not render the banner if loading or consent is already given
  if (isLoading || cookieConsent !== null) {
    return null;
  }

  if (cookieConsent) {
    return null;
  }

  return (
    <Alert className="fixed bottom-4 left-4 space-x-4 z-10 flex items-center w-full lg:w-[500px] mx-auto">
      <Cookie className="size-6" />
      <div className="flex-1">
        <AlertTitle className="font-medium">Confirmation</AlertTitle>
        <AlertDescription>This site uses cookies</AlertDescription>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </Button>
        <Button
          onClick={() => setCookieConsent(true)}
        >
          Accept
        </Button>
      </div>
    </Alert>
  );
}
