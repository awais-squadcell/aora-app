import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectID: "678a4c810001171449c4",
  databaseID: "678a4faa0000bf5e2dd3",
  usersCollectionID: "678a5066000586c68885",
  videosCollectionID: "678a5066000586c68885",
};

const client = new Client();

client
  .setProject(config.projectID)
  .setEndpoint(config.endpoint);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
    try {
      // Create user in Appwrite authentication
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
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message || "Failed to log in.");
  }
}
