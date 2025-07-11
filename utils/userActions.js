import { chatServer, userServer } from "@/constants/server";

export const getCredentials = async () => {
  try {
    const jsonString = await SecureStore.getItemAsync("user_credentials");
    if (!jsonString) {
      // No credentials stored
      return null;
    }

    const credentials = JSON.parse(jsonString);
    const now = Date.now();

    if (credentials.expiresAt && now > credentials.expiresAt) {
      // Token expired, delete it
      await SecureStore.deleteItemAsync("user_credentials");
      return null;
    }

    // Token valid
    return credentials;
  } catch (error) {
    console.error("Failed to retrieve credentials:", error);
    return null;
  }
};

export const getUser = async (code) => {
  try {
    const { token, code } = await getCredentials();

    if (token === undefined) throw new Error("Session Expired");

    const response = await fetch(
      `${userServer}/api/clients/display/user/${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
          // Cookie: cookie,
        },
        mode: "cors",
        credentials: "include",
      }
    );

    const res = await response.json();
    // console.log(res);

    const user = await res["data"];

    if (res.status !== 200) {
      throw new Error(res.message || "Failed");
    }

    return user;
  } catch (error) {
    console.error("Error getting user:", error.message);
    throw error;
  }
};

export const findUser = async (query) => {
  try {
    const ekiResponse = await fetch(
      `https://api.ekiconet.digital/api/client/existence/${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );

    const data = await ekiResponse.json();

    if (data?.status !== 200) {
      throw new Error(data?.message || "Failed");
    }

    console.log("first search complete!!");

    const response = await fetch(
      `${chatServer}/api/chat/user/find?email=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );

    if (response.status === 404) {
      return { status: 400, user: data?.content[0], message: "old version" };
    }

    const res = await response.json();

    const user = await res["data"];

    return { status: 200, user: data?.content[0] };
  } catch (error) {
    console.error("Error getting user:", error.message);
    throw error;
  }
};

export const getUserLinkGroup = async () => {
  const { token, code } = await getCredentials();

  try {
    const response = await fetch(
      `${userServer}/api/groups/display/user/${code}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          // Cookie: cookie,
        },
        mode: "cors",
        credentials: "include",
      }
    );

    const res = await response.json();
    // console.log(res);

    const data = await res["data"];

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed");
    }

    return data;
  } catch (error) {
    console.error("Error getting link group:", error.message);
    throw error;
  }
};

export const getUserLinks = async () => {
  const { token, code } = await getCredentials();
  try {
    const response = await fetch(
      `${userServer}/api/groups/item/display/all/${code}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          // Cookie: cookie,
        },
        mode: "cors",
        credentials: "include",
      }
    );

    const res = await response.json();
    // console.log(res);

    const data = await res["data"];

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed");
    }
    return data;
  } catch (error) {
    console.error("Error getting links:", error.message);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await SecureStore.deleteItemAsync("user_credentials");
    console.log("Credentials cleared successfully");
  } catch (error) {
    console.error("Failed to clear credentials:", error);
  }
};

export const getAllRooms = async (id) => {
  const authUrl = `${chatServer}/api/chat/last-message/${id}`;

  try {
    const response = await fetch(authUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
    });

    const res = await response.json();

    // Check if the request was successful (response.ok)
    if (!response.ok) {
      throw new Error(res.error || "Failed to fetch rooms");
    }

    return res;
  } catch (error) {
    console.error("Error getting rooms:", error.message);
    throw error;
  }
};

export const getRoomsById = async (id) => {
  try {
    const response = await fetch(`${chatServer}/api/chat/last-message/${id}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user");
    }

    const user = await response.json(); // Adjust based on your API response structure

    return user.data;
  } catch (error) {
    console.error("Error getting user:", error.message);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetch(
      `https://api.ekiconet.digital/api/clients/display/user/${id}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user");
    }

    const user = await response.json(); // Adjust based on your API response structure

    return user.data;
  } catch (error) {
    console.error("Error getting user:", error.message);
    throw error;
  }
};
