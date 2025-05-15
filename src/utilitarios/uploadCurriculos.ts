// src/infraestrutura/config/uploadConfig.ts

import multer from "multer";
import path from "path";
import fs from "fs";


const pastaCurriculos = path.resolve(__dirname, "..", "..", "curriculos");
if (!fs.existsSync(pastaCurriculos)) {
  fs.mkdirSync(pastaCurriculos, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaCurriculos);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });
