import * as firebase from "firebase-admin";

import { Category } from "./models/category";

export async function all(): Promise<Category[]> {
  const categories: Category[] = [];
  const collection = await firebase.firestore()
    .collection("categories")
    .where("count", ">", 0)
    .orderBy("count", "asc")
    .get();
  collection.forEach(category => categories.push(category.data() as Category));

  return categories;
}