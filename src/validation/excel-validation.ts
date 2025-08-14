import z, { ZodType } from "zod";

export default class ExcelValidation {
  static readonly UPDATE: ZodType = z.object({
    urlExcel: z.string({ error: "Url excel must be a string!" }),
    key: z.string({ error: "Key of file must be a string!" }),
    keyOld: z.string({ error: "Key old of file must be a string!" }),
  });
}
