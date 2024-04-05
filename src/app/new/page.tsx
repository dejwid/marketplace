'use client';
import AdForm from "@/components/AdForm";

const locationDefault = {
  lat: 59.432226005726896,
  lng: 18.057839558207103,
}

export default function NewAdPage() {
  return (
    <AdForm defaultLocation={locationDefault} />
  );
}