import { APIKEY } from "@/lib";

async function apiCall(url: string) {
  const response = await fetch(`${process.env.HOST_URL}${url}`, {
    headers: { "api-key": APIKEY },
    cache: 'no-store',
  });
  return response.json();
}

export default apiCall;