import { ImgItem } from "./../models/ImageItem";
import httpService from "./http.service";

const fileEndpoint = "files/";

const fileService = {
  create: async (payload: File | string | undefined, key: string) => {
    if (typeof payload !== "undefined") {
      const formData = new FormData();
      formData.append("file", payload);

      const { data } = await httpService.post(fileEndpoint + key, formData);

      return data;
    }
  },

  edit: async (
    payload: File | string | undefined,
    dat: ImgItem | undefined,
  ) => {
    if (typeof payload !== "undefined" && typeof dat !== "undefined") {
      const formData = new FormData();
      formData.append("file", payload);

      const { data } = await httpService.patch(
        fileEndpoint + dat._id,
        formData,
      );

      return data;
    }
  },
  remove: async (payload: ImgItem | undefined) => {
    if (typeof payload !== "undefined") {
      const { data } = await httpService.delete(fileEndpoint + payload._id);

      return data;
    }
  },
};

export default fileService;
