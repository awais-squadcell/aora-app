import { Alert } from "react-native";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectID: "678a4c810001171449c4",
  databaseID: "678a4faa0000bf5e2dd3",
  storageID: '678a52d30008b4c03737',
  usersCollectionID: "678a5066000586c68885",
  videosCollectionID: "678a5091002797c8925e",
};

const client = new Client();

client.setProject(config.projectID).setEndpoint(config.endpoint);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) {
      throw new Error("Account creation failed.");
    }

    const avatarUrl = avatars.getInitials(username);
    await signIn(email,password);
    const newUser = await databases.createDocument(
      config.databaseID,
      config.usersCollectionID,
      ID.unique(),
      {
        accountID: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl.href,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error.message || "An error occurred while creating the user.");
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message || "Failed to log in.");
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    if (error.code === 401) {
      return null;
    }
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) {
      return null;
    }

    const currentUser = await databases.listDocuments(
      config.databaseID,
      config.usersCollectionID,
      [Query.equal("accountID", currentAccount.$id)]
    );

    if (!currentUser) throw error;

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

//Get All Video Posts
export const getAllPosts = async ()=> {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videosCollectionID,
      [Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

//Get Latest Video Posts
export const getLatestPosts = async ()=> {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videosCollectionID,
      [Query.limit(7),Query.orderDesc("$createdAt")]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videosCollectionID,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong or videos are missing");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Get video posts created by user
export async function getUserPosts(userID) {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videosCollectionID,
      [Query.equal("creator", userID),Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,}

  try {
    const uploadedFile = await storage.createFile(
      config.storageID,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageID, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageID,
        fileId, 2000, 2000, "top", 100 );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseID,
      config.videosCollectionID,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userID,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

//Get Saved Videos
export async function fetchSavedVideos() {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videosCollectionID,
      [Query.equal("saved", true)]
    );
    
  return posts.documents;
  } catch (error) {
      console.error("Error fetching saved videos:", error);
      return [];
  }
};

//Save Videos
export async function handleFavorite(videoId) {
  try {
    if (!videoId) {
      Alert.alert("Invalid method to save video.");
      return;
    }
    await databases.updateDocument(
      config.databaseID,
      config.videosCollectionID,
      videoId, 
      {saved: true}
    );
    Alert.alert("Video saved to favorites!");
    } catch (error) {
        console.error("Error saving video:", error);
        Alert.alert("Failed to save video. Please try again.");
    }
};    