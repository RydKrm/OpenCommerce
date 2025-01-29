import { z } from "zod";

class ReplyCrudDto {
  create = z.object({
    commentId: z.number({ message: "Comment id is required" }),
    userId: z.number({ message: "User id is required" }),
    content: z.string({ message: "Content is required" }),
  });
  update = z.object({
    content: z.string({ message: "Content is required" }),
  });
}

const replyCrudDto = new ReplyCrudDto();
export default replyCrudDto;
