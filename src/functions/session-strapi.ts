import { S } from "dist/server/chunks/astro_DdgkKQxt.mjs";

export type SessionStrapiManagerType = {
  Astro: any;
  sessionID: string;
  reset: () => void;
  getData: () => Promise<any>;
  save: (sessionData: any) => Promise<boolean>;
  existsSession: () => Promise<boolean>;
};

export class SessionStrapiManager {
  Astro: any;
  sessionID: string;

  constructor(Astro, sessionID: string) {
    this.Astro = Astro;
    this.sessionID = sessionID;
  }

  static async getID(Astro) {
    console.log("getID");
    let sessionId = Astro.cookies.get("astro-session")?.value;

    // if not session cookie, create one
    if (!sessionId) {
      sessionId = getUUID();
      let exists = await SessionStrapiManager.existsSession(sessionId);
      // while (exists) {
      //   sessionId = getUUID();
      //   exists = await SessionStrapiManager.existsSession(sessionId);
      // }
      if (!exists) {
        await this.createSession(sessionId);
      }
    }

    return sessionId;
  }

  reset() {
    this.save({});
  }

  async getData() {
    console.log("getData");
    // file exists

    const exists = await SessionStrapiManager.existsSession(this.sessionID);

    if (!exists) {
      await SessionStrapiManager.createSession(this.sessionID);
    }

    const data = await fetch("http://localhost:1337/api/session/get", {
      method: "GET",
      headers: {
        cookie: `session=${this.sessionID}`,
      },
    }).then((res) => res.json());

    return data;
  }

  async save(sessionData) {
    console.log("save");
    const data = await fetch("http://localhost:1337/api/session/save", {
      method: "POST",
      headers: {
        cookie: `session=${this.sessionID}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionData),
    })
      .then((res) => res.json())
      .then((res) => res.exists);

    return data;
  }

  static async existsSession(sessionID) {
    console.log("existsSession");
    let exists = await fetch("http://localhost:1337/api/session/get", {
      method: "GET",
      headers: {
        cookie: `session=${sessionID}`,
      },
    }).then((res) => res.json());

    return !!exists;
  }

  static async createSession(session: string) {
    console.log("createSession");
    const data = await fetch("http://localhost:1337/api/session/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session }),
    })
      .then((res) => res.json())
      .then((res) => res.exists);

    return data;
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
