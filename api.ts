interface Params {
  [key: string]: string;
}

export interface RequestConfig {
  params?: Params;
  url: string;
  body?: BodyInit;
}

const createApi = (
  config: { baseURL: string; defaultHeaders?: { [header: string]: string } },
) => {
  const { defaultHeaders, baseURL } = config;
  const headers = new Headers();
  if (defaultHeaders) {
    Object.entries(defaultHeaders).forEach(([defaultKey, defaultValue]) => {
      headers.set(defaultKey, defaultValue);
    });
  }

  const createURL = (url: string, params?: Params): string => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        searchParams.set(paramKey, paramValue);
      });
    }
    let paramStr = searchParams.toString();
    if (paramStr) {
      paramStr = `?${paramStr}`;
    }
    return `${baseURL || ""}${url}${paramStr}`;
  };

  const get = ({ url, params }: RequestConfig) => {
    return fetch(createURL(url, params), {
      method: "GET",
      headers,
    });
  };

  return {
    get,
  };
};

const createClimaClient = () => {
  const CLIMACELL_API_KEY = Deno.env.get("CLIMACELL_API_KEY") || "";
  const client = createApi({
    baseURL: "https://api.climacell.co/v3",
    defaultHeaders: {
      "content-type": "application/json",
      "apikey": CLIMACELL_API_KEY,
    },
  });

  const getCurrentCloudCover = async () => {
    const url = "/weather/realtime";
    const params = {
      "lon": "-86.7493",
      "lat": "36.1811",
      unit_system: "si",
      fields: "cloud_cover",
    };
    const resp = await client.get({ url, params });
    return resp;
  };

  return {
    getCurrentCloudCover,
  };
};

export const climaClient = createClimaClient();

export default createApi;
