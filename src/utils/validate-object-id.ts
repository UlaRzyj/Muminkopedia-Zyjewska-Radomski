import { isValidObjectId } from "mongoose";
import { HttpError } from "../errors/http-error";

export const validateObjectId = (id: string, fieldName = "id") => {
    if (!isValidObjectId(id)) {
        throw new HttpError(400, `Niepoprawne ${fieldName}`);
    }
};
