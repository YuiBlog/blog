import { Entry } from "@yuiblog/types";
import dayjs from "dayjs";

export function createUrl(entry: Entry): string {
  const createdAt = dayjs(new Date(entry.created_at._seconds * 1000));
  return `${createdAt.format("YYYY/MM")}/${entry.slug || entry.id}`;
}