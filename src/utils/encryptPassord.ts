import { createHash } from "node:crypto";

export function encryptPassword(password: string) {
    return createHash("sha256")
        .update(password)
        .digest("base64");
}