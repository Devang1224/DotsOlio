type PeopleSearchItem = {
  id: number;
  type: "people";
  name: string;
  status: string;
  image: string;
  activity: 'active' | 'inactive' | 'wasActive'
};

type FileSearchItem = {
  id: number;
  type:"file" | "folder";
  fileType?:"image" | "video" | "document"
  name: string;
  status: string;
  location: string;
};

type SearchDataTypes = "people" | "file" | "folder" | "chat" | "list";

type SearchData = PeopleSearchItem | FileSearchItem;

export type {
    SearchData,
    SearchDataTypes
}