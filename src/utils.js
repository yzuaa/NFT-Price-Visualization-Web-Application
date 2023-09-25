const origin = "https://deep-index.moralis.io";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE3YzJjNTI4LTUxNzItNDQ2Mi05ODA3LTQwZjE0MGIyN2ZiZCIsIm9yZ0lkIjoiMzQ3MzY5IiwidXNlcklkIjoiMzU3MDYzIiwidHlwZUlkIjoiMjBkM2M5YmUtZTA2NS00NzgxLTg4ZjItODk3MzIzMjQ2Y2MyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODg4NTQxNjYsImV4cCI6NDg0NDYxNDE2Nn0.VzKxzRBM2cHgsq1GJgJ7xGlZgc1z10dSRXmXZd6Md9s";

export const searchNFTs = async (searchText) => {
  const url = new URL(`${origin}/api/v2/nft/search`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("q", searchText);
  url.searchParams.append("filter", "name");
  url.searchParams.append("limit", "12");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getNFTTrades = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}/trades`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("marketplace", "opensea");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getContractNFTs = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};
