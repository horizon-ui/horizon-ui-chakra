import * as type from "../types";

export const getTags = () => ({
  type: type.GET_TAGS_REQUESTED,
});
export const getTagById = (id) => {
  console.log("get tag by id:", id);
  return {
    type: type.GET_TAG_REQUESTED,
    payload: id,
  };
};
