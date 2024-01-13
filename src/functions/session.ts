import fs from "fs";

const SESSION_FOLDER = "./src/sessions";

export class SessionManager {
  Astro: any;
  sessionID: string;

  constructor(Astro) {
    this.Astro = Astro;
  }

  getID() {
    let session = this.Astro.cookies.get("astro-session")?.value;
    
    // if not session cookie, create one
    if (!session) {
      session = getUUID();
      let exists = this.existsSessionFile(session);
      while (exists) {
        session = getUUID();
        exists = this.existsSessionFile(session);
      }
      this.Astro.cookies.set("astro-session", session);
      session = this.Astro.cookies.get("astro-session").value;
    }

    return session;
  }

  reset() {
    this.save({});
  }

  getData() {
    // file exists
    const session = this.getID();
    const exists = this.existsSessionFile(session);

    if (!exists) {
      return {};
    }

    // read file
    const file = fs.readFileSync(`${SESSION_FOLDER}/${session}.json`, "utf-8");

    return JSON.parse(file);
  }

  save(sessionData) {
    const session = this.getID();
    // write file
    fs.writeFileSync(
      `${SESSION_FOLDER}/${session}.json`,
      JSON.stringify(sessionData, null, 2)
    );
  }

  existsSessionFile(session: string) {
    fs.existsSync(SESSION_FOLDER) || fs.mkdirSync(SESSION_FOLDER);
    const exists = fs.existsSync(`${SESSION_FOLDER}/${session}.json`);
    if(!exists) {
      fs.writeFileSync(`${SESSION_FOLDER}/${session}.json`, "{}");
    }

    return exists;
  }
}

// get a random UUID
export function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // tslint:disable-next-line:no-bitwise
    const r = (Math.random() * 16) | 0;
    // tslint:disable-next-line:no-bitwise
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
