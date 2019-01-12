import * as firebase from "firebase-admin";

import { Settings } from "../types";
import * as _ from "./utils";

export async function blog(): Promise<Settings.Blog> {
  const obj = await firebase.firestore()
    .collection("settings")
    .doc("blog")
    .get();
  return obj.data() as Settings.Blog;
}

export async function user(): Promise<Settings.User> {
  const obj = await firebase.firestore()
    .collection("settings")
    .doc("user")
    .get();
  return obj.data() as Settings.User;
}
