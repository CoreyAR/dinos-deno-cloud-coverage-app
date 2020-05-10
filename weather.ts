import { climaClient } from "./api.ts";

const getCloudCover = async () => {
  const resp = await climaClient.getCurrentCloudCover();
  const jsonBody = await resp.json();
  return { data: { cloudCover: jsonBody.cloud_cover.value } };
};

export default getCloudCover;
