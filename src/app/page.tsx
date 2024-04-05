'use client';
import AdItem from "@/components/AdItem";
import SearchForm from "@/components/SearchForm";
import {defaultRadius} from "@/libs/helpers";
import {Ad} from "@/models/Ad";
import {useState} from "react";

export default function Home() {
  const [ads, setAds] = useState<Ad[]|null>(null);
  const [adsParams, setAdsParams] = useState<URLSearchParams>(new URLSearchParams);

  function fetchAds(params?:URLSearchParams) {
    if (!params) {
      params = new URLSearchParams();
    }
    if (!params.get('center')) {
      return;
    }
    if (!params.has('radius')) {
      params.set('radius', defaultRadius.toString());
    }
    const url = `/api/ads?${params?.toString() || ''}`;
    fetch(url).then(response => {
      response.json().then(adsDocs => {
        setAds(adsDocs);
        setAdsParams(params);
      });
    });
  }

  function handleSearch(formData: FormData) {
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        params.set(key, value);
      }
    });
    fetchAds(params);
  }

  const formDirty = adsParams.get('phrase')
    || adsParams.get('category')
    || adsParams.get('min')
    || adsParams.get('max');

  return (
    <div className="flex w-full">
      <SearchForm action={handleSearch} />
      <div className="p-4 grow bg-gray-100 w-3/4">
        <h2 className="font-bold mt-2 mb-4">
          {formDirty ? 'Search results' : 'Latest ads'}
        </h2>
        <div className="grid md:grid-cols-4 gap-x-4 gap-y-6">
          {ads && ads.map(ad => (
            <AdItem key={ad._id} ad={ad} />
          ))}
        </div>
        {ads && ads?.length === 0 && (
          <div className="text-gray-400">No products found</div>
        )}
        {ads === null && (
          <div className="text-gray-400">Loading...</div>
        )}
      </div>
    </div>
  );
}
