import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectID: "678a4c810001171449c4",
  databaseID: "678a4faa0000bf5e2dd3",
  usersCollectionID: "678a5066000586c68885",
  videosCollectionID: "678a5091002797c8925e",
};

const client = new Client();

client.setProject(config.projectID).setEndpoint(config.endpoint);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) {
      throw new Error("Account creation failed.");
    }

    const avatarUrl = avatars.getInitials(username);

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
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No account found.");

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
      config.videosCollectionID
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
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}