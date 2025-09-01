import { Client, Databases, ID, Query } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // Prefer checking by movie_id (unique per movie)
    const result = await database.listDocuments(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
      [Query.equal("movie_id", movie.id)]
    );

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
        existingMovie.$id,
        {
          count: (existingMovie.count ?? 0) + 1, // fallback if null
        }
      );
    } else {
      await database.createDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!,
        ID.unique(),
        {
          searchterm: query,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};
