import IResponse from "@/types/IResponse";

const sendData = async (
  statusCode: number,
  message: string,
  data?: any
): Promise<IResponse> => {
  return {
    statusCode,
    message,
    data,
  };
};

export default sendData;
