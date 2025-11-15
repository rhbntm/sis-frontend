import api from "./api";

export const generateQR = async (text) => {
  const res = await api.post(
    "/qrcode",
    { data: text },
    { responseType: "arraybuffer" }
  );

  const base64 = btoa(
    new Uint8Array(res.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  return `data:image/png;base64,${base64}`;
};
